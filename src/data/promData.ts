export const PROM=
{
    'resourceType': 'QuestionnaireResponse',
    'id': '637288805f83d970f5ba8c53', // Dynamic generated
    'encounter': {'reference': 'Encounter/id3'}, // the ID hast to be the same as the encounter

    'identifier': { //irrelevant Löschen
        'value': '1'
    },
    'status': 'in-progress',
    'subject': {
        'reference': 'Patient/6229f573ef86a8613c662197', // Here put the Patient variable DisplaName/ID
        'display': 'Lukas Dev'
    },
    'item': [ // here is the answers , gezt them from the arrays in the prom.vue
        {
            'linkId': '1',
            'definition': 'Global01',
            'answer': [
                {
                    'valueInteger': 1
                }
            ]
        },
        {
            'linkId': '2',
            'definition': 'Global02',
            'answer': [
                {
                    'valueInteger': 1
                }
            ]
        },
        {
            'linkId': '3',
            'definition': 'Global03',
            'answer': [
                {
                    'valueInteger': 1
                }
            ]
        },
        {
            'linkId': '4',
            'definition': 'Global04',
            'answer': [
                {
                    'valueInteger': 1
                }
            ]
        },
        {
            'linkId': '5',
            'definition': 'Global05',
            'answer': [
                {
                    'valueInteger': 1
                }
            ]
        },
        {
            'linkId': '6',
            'definition': 'Global09r',
            'answer': [
                {
                    'valueInteger': 1
                }
            ]
        },
        {
            'linkId': '7',
            'definition': 'Global06',
            'answer': [
                {
                    'valueInteger': 1
                }
            ]
        },
        {
            'linkId': '8',
            'definition': 'Global10r',
            'answer': [
                {
                    'valueInteger': 1
                }
            ]
        },
        {
            'linkId': '9',
            'definition': 'Global08r',
            'answer': [
                {
                    'valueInteger': 1
                }
            ]
        },
        {
            'linkId': '10',
            'definition': 'Global07r',
            'answer': [
                {
                    'valueInteger': 1
                }
            ]
        }
    ]
}

