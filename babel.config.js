module.exports = {
    presets: [
        ['@babel/env', {
            targets: {
                node: 8,
            },
            loose: true,
            shippedProposals: true,
            useBuiltIns: 'usage',
        }],
        '@babel/typescript',
    ],
    plugins: [
        '@babel/proposal-class-properties',
        ['module-resolver', {
            root: ['./src'],
        }],
    ],
}
