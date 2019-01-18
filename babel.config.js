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
        ['module-resolver', {
            root: ['./src'],
        }],
    ],
}
