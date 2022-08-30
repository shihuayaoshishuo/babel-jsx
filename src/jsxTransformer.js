const srcPath = '/Users/wzk/Desktop/test-project/jsx-test/src/';

/* --------------- 使用react官方的babel插件进行转换 --------------- */
// const babel = require('@babel/core');
// const transformedCode = babel.transformFileSync(srcPath + 'App.js', {
//   plugins: [['@babel/plugin-transform-react-jsx']],
// });

/* --------------- 自己实现babel插件进行转换 --------------- */
const babel = require('@babel/core');
const { types } = babel;
const transformedCode = babel.transformFileSync(srcPath + 'App.js', {
  plugins: [
    '@babel/plugin-syntax-jsx',
    function transformJsxToJs() {
      return {
        visitor: {
          JSXElement(path) {
            coreFunc(path);
          },
        },
      };
    },
  ],
});

function coreFunc(path) {
  // 逻辑映射1：拿到 JSXElement 时，创建 CallExpression，并做节点替换
  let callExpression = types.callExpression(
    // 逻辑映射2：callee 固定，类型为 MemberExpression，值为"React.createElement"
    types.memberExpression(types.identifier('React'), types.identifier('createElement')),

    // 逻辑映射3：三个参数
    [
      // 参数一：jsx类型
      types.stringLiteral(path.node.openingElement.name.name),

      // 参数二：入参数组
      (() => {
        let attribs = [];
        path.node.openingElement.attributes.forEach((item) => {
          var valueNode = item.value;
          if (item.value.expression) {
            valueNode = item.value.expression;
          }
          attribs.push(
            types.objectProperty(types.identifier(item.name.name), types.cloneNode(valueNode, true))
          );
        });
        return types.objectExpression(attribs);
      }).call(),

      // 参数三：子jsx列表
      ...(() => {
        path.node.children.forEach((item, index) => {
          if (types.isJSXText(item)) {
            path.node.children[index] = types.stringLiteral(item.value);
          }
        });
        return path.node.children;
      }).call(),
    ]
  );
  path.replaceWith(callExpression);
}

/* --------------- 将结果写入目标文件 --------------- */
const targetFile = srcPath + 'TransformedApp.js';
var fs = require('fs');
if (fs.existsSync(targetFile)) {
  fs.unlinkSync(targetFile);
}
fs.writeFileSync(targetFile, transformedCode.code);
