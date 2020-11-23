const { notEmpty } = require('../utils.js')

module.exports = {
    description: 'generate vue component',
    prompts: [{
            type: 'list',
            name: 'type',
            message: 'type:',
            choices: [{
                name: 'public',
                value: 'public'
            }, {
                name: 'private',
                value: 'private'
            }]
        },
        {
            type: 'input',
            name: 'parent',
            message: 'component parentFolder name please',
            when: (answer) => {
                return answer.type === 'private'
            },
            validate: notEmpty('parent')
        },
        {
            type: 'input',
            name: 'name',
            message: 'component name please',
            validate: notEmpty('name')
        },

        {
            type: 'checkbox',
            name: 'blocks',
            message: 'Blocks:',
            choices: [{
                    name: '<template>',
                    value: 'template',
                    checked: true
                },
                {
                    name: '<script>',
                    value: 'script',
                    checked: true
                },
                {
                    name: 'style',
                    value: 'style',
                    checked: true
                }
            ],
            validate(value) {
                if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
                    return 'Components require at least a <script> or <template> tag.'
                }
                return true
            }
        }
    ],
    actions: data => {
        const name = '{{name}}';
        const parent = '{{parent}}';
        let path;
        if (data.type === 'private') {
            path = `src/views/${parent}/components/${name}.vue`
        } else {
            path = `src/components/${name}/index.vue`
        }
        const actions = [{
            type: 'add',
            path,
            templateFile: 'plop-templates/component/index.hbs',
            data: {
                name: name,
                template: data.blocks.includes('template'),
                script: data.blocks.includes('script'),
                style: data.blocks.includes('style')
            }
        }]

        return actions
    }
}