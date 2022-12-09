import MidataService from './midataService';
import {
  Observation,
  ObservationStatus,
  Patient,
  Practitioner,
} from '@i4mi/fhir_r4';
import { Notify } from 'quasar';
import { PATIENT } from 'src/data/patient';

const STORAGE_KEY = 'demo-app-storage';

type PatientObject = {
  firstName: string,
  familyName: string,
  address: string,
  birthdate: string,
  patID: string,
  caseID: string,
  registered: string,
  patFHIRID: string
}


export default class Storage {
  private currentLanguage = 'de';
  private observations = new Array<Observation>();
  private patientResource = PATIENT as Patient;
  private practitionerResource = {} as Practitioner;
  private currentObservation = {} as Observation;

  midata: MidataService;

  constructor(_midataService: MidataService) {
    this.midata = _midataService;
    this.restoreFromStorage();
  }

  /**
   * Persists data to sessionStorage.
   */
  private persist(): void {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this));
  }

  /**
   * Restores data from sessionStorage.
   */
  private restoreFromStorage(): void {
    const persisted = sessionStorage.getItem(STORAGE_KEY);
    if (persisted) {
      const storage = JSON.parse(persisted);
      this.currentLanguage = storage.currentLanguage;
      this.observations = storage.observations;
      this.practitionerResource = storage.practitionerResource;
    } else if (this.midata.isLoggedIn()) {
      void this.restoreFromMidata();
    } else {
      console.log('Could not restore from storage. Log in first.');
    }
  }



  public setCurrentPatient(currentPatient: PatientObject) {
    console.log(`Patient: ${currentPatient.patFHIRID}\nAddress: ${currentPatient.address}\nPatID: ${currentPatient.patID}\nFamilyName: ${currentPatient.familyName}\nFirstNAme: ${currentPatient.firstName}\nCaseID: ${currentPatient.caseID}\n`);

    this.patientResource.id = currentPatient.patFHIRID
    this.patientResource.address[0].country = currentPatient.address
    this.patientResource.identifier[0].value = currentPatient.patID
    this.patientResource.name[0].family = currentPatient.familyName
    this.patientResource.name[0].given[0] = currentPatient.firstName
    console.log(`Patientenresource: ${JSON.stringify(this.patientResource)}`);
  }

  /**
   *
   * @returns a promise:
   *              - if successfull ->
   *              - if not successfull ->
   */
  public restoreFromMidata(): Promise<void> {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.midata.getPractitioner(),
        this.midata.loadObservations(),
      ])
        .then((results) => {
          this.practitionerResource = results[0];
          this.observations = results[1] as Array<Observation>;
          this.persist();
          resolve();
        })
        .catch((error) => {
          console.warn('Error', error);
          reject(error);
        });
    });
  }

  /**
   * Sets the current Language.
   * @param _lang
   */
  public setCurrentLanguage(_lang: string): void {
    this.currentLanguage = _lang;
    this.persist();
  }

  /**
   * Gets the current language.
   * @returns the current language
   */
  public getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  /**
   * deletes all data from sessionStorage and sets the currentLanguage to 'de'.
   */
  public deleteDataInStore(): void {
    this.currentLanguage = 'de';
    this.observations = new Array<Observation>();
    this.patientResource = {} as Patient;
    this.practitionerResource = {} as Practitioner;
    this.currentObservation = {} as Observation;
    this.persist();
  }

  /**
   * Gets the patient resource from the store.
   * @returns
   */
  public getPatient(): Patient {
    return this.patientResource;
  }

  /**
   * Gets the practitioner resource from the store.
   * @returns
   */
  public getPractitioner(): Practitioner {
    return this.practitionerResource;
  }

  /**
   * Gets all Observation from the store.
   * @returns
   */
  public getObservations(): Array<Observation> {
    return this.observations;
  }

  /**
   * Creates a new Observation
   * @param _status
   * @param bodySite
   * @param value
   * @returns
   */
  public createObservation(
    _status: ObservationStatus,
    bodySite: string,
    value: number
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {
      this.midata
        .createObservation(_status, bodySite, value)
        .then((result) => {
          if (result) {
            this.midata
              .loadObservations()
              .then((res) => {
                this.observations = res as Array<Observation>;
                this.persist();
                Notify.create({
                  message: 'Observation erfolgreich gespeichert',
                  color: 'green',
                  position: 'top',
                  icon: 'announcement',
                });
                resolve(result);
              })
              .catch((error) => reject(error));
          } else {
            Notify.create({
              message: 'Die Observation konnte nicht erstellt werden',
              color: 'red',
              position: 'top',
              icon: 'announcement',
            });
            reject('Error');
          }
        })
        .catch((error) => reject(error));
    });
  }

  /**
   *
   * @param _id
   * @param bodySite
   * @param value
   * @returns
   */
  public updateObservation(
    _id: string,
    bodySite: string,
    value: number
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {
      this.midata
        .updateObservation(_id, bodySite, value)
        .then((result) => {
          if (result) {
            this.midata
              .loadObservations()
              .then((res) => {
                this.observations = res as Array<Observation>;
                this.persist();
                Notify.create({
                  message: 'Observation erfolgreich gespeichert',
                  color: 'green',
                  position: 'top',
                  icon: 'announcement',
                });
                resolve(result);
              })
              .catch((error) => reject(error));
          } else {
            Notify.create({
              message: 'Die Observation konnte nicht erstellt werden',
              color: 'red',
              position: 'top',
              icon: 'announcement',
            });
            reject('Error');
          }
        })
        .catch((error) => reject(error));
    });
  }

  /**
   *
   * @param _id
   */
  public setCurrentObservation(_id: string): void {
    void this.midata.search('Observation/' + _id).then((result) => {
      this.currentObservation = result as Observation;
      this.persist();
    });
  }

  /**
   *
   * @returns
   */
  public getCurrentObservation(): Observation {
    return this.currentObservation;
  }
}
