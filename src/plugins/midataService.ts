import { JSOnFhir } from '@i4mi/js-on-fhir'
import {
  Patient,
  Bundle,
  ObservationStatus,
  Observation,
  Practitioner,
  EpisodeOfCare,
  Organization,
  Encounter,
  QuestionnaireResponse,
} from '@i4mi/fhir_r4'
import { EPISODE_OF_CARE } from '../data/episodeOfCare'
import {PATIENT} from '../data/patient'



import moment from 'moment'

// import moment library. More information under https://momentjs.com
const now = moment()



export default class MidataService {
  jsOnFhir: JSOnFhir
  currentPatient: Record<string, unknown>
  fhirCaseID: string
  currentCaseID: string

  constructor() {
    this.jsOnFhir = new JSOnFhir(
      process.env.VUE_FHIR_BASE_URL,
      process.env.VUE_FHIR_APP_NAME,
      process.env.VUE_FHIR_REDIRECT_URL
    )
  }

  /**
   * Returns the jsOnFhir object for making direct method calls.
   * @returns the jsOnFhir as JSON.
   */
  public getJSonFhir(): JSOnFhir {
    return this.jsOnFhir
  }

  /**
   * Checks that the token isn't empty and hasn't expired yet. Therefore returns the status of the login status.
   * @returns true if the user is logged in (token valid and not expired yet) and false otherwise.
   */
  public isLoggedIn(): boolean {
    return this.jsOnFhir.isLoggedIn()
  }

  /**
   * Logs the user out by resetting authentification details.
   */
  public logout(): void {
    this.jsOnFhir.logout()
  }

  /**
   * Initiates the oAuth process.
   * @param params
   */
  public authenticate(params?: Record<string, unknown>): void {
    this.jsOnFhir.authenticate(params)
  }

  /**
   * Handles the response of oAuth portal (server).
   * @returns a promise:
   *              - if successfull -> response of the oAuth portal (server) includes: token, refreshtoken etc.
   *              - if not successfull -> error response.
   */
  public handleAuthResponse(): Promise<any> {
    return this.jsOnFhir.handleAuthResponse()
  }

  /**
   * Gets the Practitioner resource from the fhir endpoint.
   * @returns Practitioner resource as JSON
   */
  public getPractitioner(): Promise<Practitioner> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Practitioner', { _id: this.jsOnFhir.getPatient() })
        .then((result) => {
          const practitionerBundle = result as Bundle
          practitionerBundle.entry?.length !== undefined &&
          practitionerBundle.entry?.length > 0 &&
          practitionerBundle.entry[0].resource
            ? resolve(practitionerBundle.entry[0].resource as Practitioner)
            : reject('No entry in Practitioner bundle found!')
        })
        .catch((error) => reject(error))
    })
  }


  // Compleat this method setting the paramethers to the same value of the InputFileds on the patSearch and you will be able to set new Patients to the patienst array
  // setNFP PatientsArray(this: void, name?:string, family?:string, identifier?:string,gender?:string,country?:string,){
  //  const newPatient= NFPATIENT;
  //  newPatient.name[0].given[0]= name
  //  newPatient.name[0].family=family
  //  newPatient.identifier[0].value = identifier
  //  newPatient.gender=gender
  //  newPatient.address[0].country=country
  //  return newPatient
  // }



  /**
   * Gets the patient resource from the fhir endpoint.
   * @returns patient resource as JSON
   */
  public getPatient(name: string): Promise<Patient> {

    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Patient', `name=${name}`)
        .then((result) => {
          const notFoundPatient = PATIENT
          const patientBundle = result as Bundle
          patientBundle.entry?.length !== undefined && patientBundle.entry?.length > 0
            ? resolve(patientBundle.entry[0].resource as Patient)
            : reject(notFoundPatient as Patient)
        })
        .catch((error) => reject(error))
       2
    })

  }


  /**
   * Gets the patient resource from the fhir endpoint.
   * @returns patient resource as JSON
   */
  public getPatients(): Promise<Patient[]> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Patient')
        .then((result) => {
          const patientBundle = result as Bundle
          patientBundle.entry?.length !== undefined &&
          patientBundle.entry?.length > 0 &&
          patientBundle.entry[0].resource
            ? resolve(patientBundle.entry.map((x) => x.resource as Patient))
            : reject('No entry in patient bundle found!')
        })
        .catch((error) => reject(error))
    })
  }

  public getPatientName() {
    return this.currentPatient.name
  }
  public setCaseID(caseID: string){
    this.currentCaseID = caseID
  }
  public getCaseID(){
    return this.currentCaseID
  }

  public getPatientFHIRID() {
    return
  }

  public getEpisodeOfCare(patientFhirID: string): Promise<EpisodeOfCare> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search(
          'EpisodeOfCare',
          //`patient=365b187ee9ed6e1b63a90ef1&status=active` // Brönniman for debugging
          `patient=${patientFhirID}&status=active`
        )
        .then((result) => {
          const episodeBundle = result as Bundle
          episodeBundle.entry?.length !== undefined &&
          episodeBundle.entry?.length > 0 &&
          episodeBundle.entry[0].resource
            ? resolve(episodeBundle.entry[0].resource as EpisodeOfCare)
            : reject('No entry in EpisodeOfCare bundle found!')
          console.log(episodeBundle)
        })
        .catch((error) => reject(error))
    })
  }

  public getNewEpisodeOfCare() {
    const episodeOfCare = EPISODE_OF_CARE
    this.fhirCaseID = this.makeid(12)
    episodeOfCare.status = 'planned'
    episodeOfCare.id = this.fhirCaseID
    episodeOfCare.identifier[0].value = this.currentCaseID

    // would be solved with this.getOrganization() but it isnt possible to reference an organization to a practicioner in midata, which is why its simulated here
    episodeOfCare.identifier[0].assigner.display = 'Reha Bern AG'
    episodeOfCare.identifier[0].assigner.reference =
      'Organization/63777a87ab51910677069bfe'
    return episodeOfCare
  }

  /**
   * Creates a episodeOfCare resource on the fhir server
   * @returns a promise:
   *              - if successfull -> response with the created resource as JSON
   *              - if not successfull -> error message
   */
  public createEpisodeOfCareMidata(
    episodeOfCare: EpisodeOfCare
  ): Promise<EpisodeOfCare> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .create(episodeOfCare)
        .then((result) => {
          result ? resolve(result as EpisodeOfCare) : reject('Couldn\'t create Episode of Care! Check the logs!')
        })
        .catch((error) => reject(error))
    })
  }
  /**
   * Creates a episodeOfCare resource on the fhir server
   * @returns a promise:
   *              - if successfull -> response with the created resource as JSON
   *              - if not successfull -> error message
   */
  public updateEpisodeOfCareMidata(
    episodeOfCare: EpisodeOfCare
  ): Promise<EpisodeOfCare> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .update(episodeOfCare)
        .then((result) => {
          result ? resolve(result as EpisodeOfCare) : reject('Couldn\'t update Episode of Care! Check the logs!')
        })
        .catch((error) => reject(error))
    })
  }

    /**
   * Creates a episodeOfCare resource on the fhir server
   * @returns a promise:
   *              - if successfull -> response with the created resource as JSON
   *              - if not successfull -> error message
   */
     public createEncounterMidata(
      encounter: Encounter
    ): Promise<Encounter> {
      return new Promise((resolve, reject) => {
        this.jsOnFhir
          .create(encounter)
          .then((result) => {
            result ? resolve(result as Encounter) : reject('Couldn\'t create Encounter! Check the logs!')
          })
          .catch((error) => reject(error))
      })
    }

      /**
   * Creates a episodeOfCare resource on the fhir server
   * @returns a promise:
   *              - if successfull -> response with the created resource as JSON
   *              - if not successfull -> error message
   */
  public createQuestionnaireResponseMidata(
    questionnaireResponse: QuestionnaireResponse
  ): Promise<QuestionnaireResponse> {

    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .create(questionnaireResponse)
        .then((result) => {
          result ? resolve(result as QuestionnaireResponse) : reject('Couldn\'t create QuestionnaireResponse! Check the logs!')
        })
        .catch((error) => reject(error))
    })
  }
  public makeid(length: number) {
    let result = '0'
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXZY0123456789'
    const charactersLength = characters.length
    for (let i = 0 ; i < length ; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  public getOrganization(id: number): Promise<Organization> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Organization', id)
        .then((result) => {
          const organizationBundle = result as Bundle
          organizationBundle.entry?.length !== undefined &&
          organizationBundle.entry?.length > 0 &&
          organizationBundle.entry[0].resource
            ? resolve(organizationBundle.entry[0].resource as Organization)
            : reject('No entry in patient bundle found!')
        })
        .catch((error) => reject(error))
    })
  }

  /**
   * Gets the questionnaire response resources as bundle from the fhir endpoint.
   * @returns bundle with questionnaire response resources as JSON.
   */
  getQuestionnaireResponseResourcesAsBundle(): Promise<Bundle> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Questionnaire Response')
        .then((result) => {
          const questionnaireResponseBundle = result as Bundle
          questionnaireResponseBundle.entry?.length > 0
            ? resolve(questionnaireResponseBundle)
            : reject('No entries in questionnaire response bundle found!')
        })
        .catch((error) => reject(error))
    })
  }

  // getQuestionnaire() {
  //   // return prom
  // }

  setQuestionnaireData(answers: any[]) {
    console.log(`Antworten: ${String(answers)}`)

    //throw new Error('Method not implemented.')
  }

  /**
   * Gets the observation resources as bundle from the fhir endpoint.
   * @returns bundle with observation resources as JSON.
   */
  getObservationResourcesAsBundle(): Promise<Bundle> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Observation')
        .then((result) => {
          const observationBundle = result as Bundle
          observationBundle.entry?.length > 0
            ? resolve(observationBundle)
            : reject('No entries in observation bundle found!')
        })
        .catch((error) => reject(error))
    })
  }

  /**
   * Gets all observations from the fhir endpoint.
   * @returns bundle with observations
   */
  public loadObservations() {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Observation')
        .then((result) => {
          result
            ? resolve(
                (result as Bundle).entry?.map(
                  (entry) => entry.resource as Observation
                ) || []
              )
            : reject('Error')
        })
        .catch((error) => reject(error))
    })
  }

  /**
   * searches the fhir endpoint for one or more resources.
   * @param resourceType resource type to look up
   * @param params search parameters according to fhir resource guide (not mandatory)
   * @returns a promise:
   *              - if successfull -> response with resource(s) as JSON
   *              - if not successfull -> error message
   */
  search(resourceType: any, params?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search(resourceType, params)
        .then((result) => {
          result ? resolve(result) : reject('Error')
        })
        .catch((error) => reject(error))
    })
  }

  /**
   * Creates a observation (of type bodytemperature) resource on the fhir server
   * @param _status the status of the observation according to: http://hl7.org/fhir/observation-status
   * @param bodySite the body site where the bodytemperature was measured.
   * @param value the measured body temperature value.
   * @returns a promise:
   *              - if successfull -> response with the created resource as JSON
   *              - if not successfull -> error message
   */
  public createObservation(
    _status: ObservationStatus,
    bodySite: string,
    value: number
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {
      const observation = this.newBtObservation(_status, bodySite, value)
      this.jsOnFhir
        .create(observation)
        .then((result) => {
          result ? resolve(result as Observation) : reject('internal error')
        })
        .catch((error) => reject(error))
    })
  }

  /**
   * Updates a observation (of type bodytemperature) resource on the fhir server.
   * @param _id identification for the observation to be updated.
   * @param bodySite the body site where the bodytemperature was measured.
   * @param value the measured body temperature value.
   * @returns a promise:
   *              - if successfull -> response with the updated resource as JSON
   *              - if not successfull -> error message
   */
  updateObservation(
    _id: string,
    bodySite: string,
    value: number
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Observation/' + _id)
        .then((result) => {
          if (result) {
            const fhirObservation = result as Observation
            fhirObservation.valueQuantity.value = value
            fhirObservation.bodySite = this.getBodySite(bodySite)
            fhirObservation.method = this.getMethod(bodySite)
            fhirObservation.issued = now.format()
            this.jsOnFhir
              .update(fhirObservation)
              .then((res) => {
                resolve(res as Observation)
              })
              .catch((error: Error) => {
                console.warn('Could not update observation ' + _id, error)
                reject(error)
              })
          } else {
            reject(
              new Error(
                'Invalid observation id: Observation ' + _id + ' was not found.'
              )
            )
          }
        })
        .catch((error) => reject(error))
    })
  }

  /**
   * Creates observation (of type Bodytemperature) where you can specify the status, bodySite and value.
   * @param _status the status of the observation according to: http://hl7.org/fhir/observation-status
   * @param bodySite the body site where the bodytemperature was measured.
   * @param value the measured body temperature value.
   * @returns
   */
  newBtObservation(
    _status: ObservationStatus,
    bodySite: string,
    value: number
  ): Observation {
    return {
      resourceType: 'Observation',
      status: _status,
      category: [
        {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/observation-category',
              code: 'vital-signs',
              display: 'Vital Signs',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '8310-5',
            display: 'Body temperature',
          },
        ],
        text: 'Temperature',
      },
      subject: {
        reference: 'Patient/' + this.jsOnFhir.getPatient(),
      },
      issued: now.format(),
      performer: [
        {
          reference: 'Practitioner/mdh0us3',
        },
      ],
      valueQuantity: {
        value: value,
        unit: 'degrees C',
        system: 'http://unitsofmeasure.org',
        code: 'Cel',
      },
      bodySite: this.getBodySite(bodySite),
      method: this.getMethod(bodySite),
    }
  }

  /**
   * Helper function that creates a bodySite object to be used in an observation.
   * @param bodySite the body site where the bodytemperature was measured.
   * @returns bodySite with coding as JSON.
   */
  getBodySite(bodySite: string) {
    switch (bodySite) {
      case 'Axillary':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9370-3',
              display: 'Axillary',
            },
          ],
        }
      case 'Oral':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9367-9',
              display: 'Oral',
            },
          ],
        }
      case 'Ear':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA21929-7',
              display: 'Ear',
            },
          ],
        }
      case 'Tympanic membrane':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9368-7',
              display: 'Tympanic membrane',
            },
          ],
        }
      case 'Temporal artery (forehead)':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9370-3',
              display: 'Temporal artery (forehead)',
            },
          ],
        }
      case 'Rectal':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9370-3',
              display: 'Rectal',
            },
          ],
        }
      case 'Urinary bladder':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9371-1',
              display: 'Urinary bladder',
            },
          ],
        }
      case 'Nasal':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9263-0',
              display: 'Nasal',
            },
          ],
        }
      case 'Nasopharyngeal':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA18005-1',
              display: 'Nasopharyngeal',
            },
          ],
        }
      case 'Finger':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA11862-2',
              display: 'Finger',
            },
          ],
        }
      case 'Toe':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: '	LA21930-5',
              display: 'Toe',
            },
          ],
        }
      default:
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9370-3',
              display: 'Axillary',
            },
          ],
        }
    }
  }

  /**
   * Helper function that creates a Method of measurement to be used in an observation.
   * @param bodySite the body site where the bodytemperature was measured.
   * @returns method of temperature taking with coding as JSON.
   */
  getMethod(bodySite: string) {
    switch (bodySite) {
      case 'Oral':
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '89003005',
              display: 'Oral temperature taking (procedure)',
            },
          ],
        }
      case 'Ear':
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '448093005',
              display:
                'Measurement of temperature using tympanic thermometer (procedure)',
            },
          ],
        }
      case 'Tympanic membrane':
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '448093005',
              display:
                'Measurement of temperature using tympanic thermometer (procedure)',
            },
          ],
        }
      case 'Rectal':
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '18649001',
              display: 'Rectal temperature taking (procedure)',
            },
          ],
        }
      default:
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '56342008',
              display: 'Temperature taking (procedure)',
            },
          ],
        }
    }
  }
}
