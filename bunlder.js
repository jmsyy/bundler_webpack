const fs = require('fs');
const path = require('path');
const babylon = require('babylon')
const traverse = require('babel-traverse').default;

let ID = 0;

function createdAsset (fileName) {
    const content = fs.readFileSync(fileName, 'utf-8');
    const ast = babylon.parse(content,{sourceType: "module"});

    const dependencies = [];

    traverse(ast, {
        ImportDeclaration: ({node}) => {
            dependencies.push(node.source.value)
        }
    })

    const id = ID++;

    return {
        id,
        fileName,
        dependencies
    }
}

function createdGraph (entry) {
    const mainAsset = createdAsset(entry);

    const queue = [mainAsset];
    
    for (const asset of queue) {
        const dirname = path.dirname(asset.fileName);

        asset.mapping = {};

        asset.dependencies.forEach((relativePath) =>{
            const absolutePath =  path.join(dirname, relativePath);

            const child =  createdAsset(absolutePath);

            asset.mapping[relativePath] = child.id;

            queue.push(child);

        })
    }

    return queue;

}

const graph = createdGraph('./example/entry.js')

console.log(graph);