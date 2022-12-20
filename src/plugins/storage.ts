import MidataService from './midataService';
import {
  Patient,
  PatientAdministrativeGender,
  Practitioner,
} from '@i4mi/fhir_r4';
import { PATIENT } from 'src/data/FHIRressources';

const STORAGE_KEY = 'demo-app-storage';

type PatientObject = {
  firstName: string;
  familyName: string;
  address: string;
  birthdate: string;
  patID: string;
  caseID: string;
  registered: string;
  patFHIRID: string;
};

export default class Storage {
  private currentLanguage = 'de';
  private patientResource = PATIENT as Patient;
  private practitionerResource = {} as Practitioner;

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
      this.practitionerResource = storage.practitionerResource;
    } else if (this.midata.isLoggedIn()) {
      void this.restoreFromMidata();
    } else {
      console.log('Could not restore from storage. Log in first.');
    }
  }

  public setCurrentPatient(currentPatient: PatientObject) {
    if (currentPatient.patFHIRID) {
      this.patientResource.id = currentPatient.patFHIRID;
    } else {
      this.patientResource.id = this.midata.makeid(12);
    }
    this.patientResource.address[0].country = currentPatient.address;
    this.patientResource.identifier[0].value = currentPatient.patID;
    this.patientResource.identifier[0].assigner.display = 'Reha Bern'
    this.patientResource.identifier[0].assigner.reference = 'Organization/63777a87ab51910677069bfe';
    this.patientResource.name[0].family = currentPatient.familyName;
    this.patientResource.name[0].given[0] = currentPatient.firstName;
    this.patientResource.birthDate = currentPatient.birthdate;
    console.log(`Patientresource: ${JSON.stringify(this.patientResource)}`);
  }

  public updateCurrentPatient(email: string, gender: string, id: string) {
    this.patientResource.gender = gender as PatientAdministrativeGender;
    this.patientResource.telecom[0].value = email;
    this.patientResource.id = id
  }

  /**
   *
   * @returns a promise:
   *              - if successfull ->
   *              - if not successfull ->
   */
  public restoreFromMidata(): Promise<void> {
    return new Promise((resolve, reject) => {
      Promise.all([this.midata.getPractitioner()])
        .then((results) => {
          this.practitionerResource = results[0];
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
    this.patientResource = {} as Patient;
    this.practitionerResource = {} as Practitioner;
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
}
