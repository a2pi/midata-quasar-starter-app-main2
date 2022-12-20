import { JSOnFhir } from '@i4mi/js-on-fhir'
import {
  Patient,
  Bundle,
  Practitioner,
  EpisodeOfCare,
  Organization,
  Encounter,
  QuestionnaireResponse,
} from '@i4mi/fhir_r4'
import { PATIENT } from '../data/FHIRressources'
import { storage } from 'src/boot/plugins'

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
  public async getPractitioner(): Promise<Practitioner> {
    return await new Promise((resolve, reject) => {
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

    /**
   * Creates a Patient resource on the fhir server
   * @returns a promise:
   *              - if successfull -> response with the created resource as JSON
   *              - if not successfull -> error message
   */
     public async createPatientMidata(
    ): Promise<Patient> {
      const currentPatient = storage.getPatient()
       return await new Promise((resolve, reject) => {
        this.jsOnFhir
          .create(currentPatient)
          .then((result) => {
            result ? resolve(result as Patient) : reject('Couldn\'t create Patient! Check the logs!')
          })
          .catch((error) => reject(error))
      })
    }

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
    while ( result.length <length) {
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

  public setCaseID(caseID: string) {
    this.currentCaseID = caseID
  }

  public getCaseID() {
    return this.currentCaseID
  }

  public getPatientFHIRID() {
    return
  }

}
