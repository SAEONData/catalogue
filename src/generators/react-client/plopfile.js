module.exports = function (plop) {
  const templateFiles = [
    'templates/**/*'
  ]

  plop.setGenerator('NPM package', {
    description: 'Creates boiler-plate project for publishing to NPM',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: 'Package name (@saeon/<name>): ',
      },
      {
        type: 'input',
        name: 'packageDescription',
        message: 'Package description: ',
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: '../../services/{{dashCase packageName}}',
        base: 'templates',
        templateFiles,
      },
    ],
  })
}
