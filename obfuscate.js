const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

// Các thư mục và tập tin cần được làm xáo trộn
const folderToObfuscate = ['utils'];
const filesToObfuscate = ['index.js'];

// thư mục đầu ra
const đầu raDir ='dist';

// Đảm bảo thư mục đầu ra tồn tại
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// làm xáo trộn các tùy chọn
const obfuscationOptions = {
    nhỏ gọn: đúng,
    controlFlowFlattening: đúng,
    controlFlowFlatteningThreshold: 0,75,
    deadCodeInjection: đúng,
    deadCodeInjectionThreshold: 0,4,
    debugProtection: sai,
    debugProtectionInterval: 0,
    vô hiệu hóaConsoleOutput: sai,
    định danhNamesGenerator:'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0,75,
    TransformObjectKeys: đúng,
    unicodeEscapeSequence: sai,
    // Tắt bản đồ nguồn
    bản đồ nguồn: sai,
};

// Lấy đệ quy tất cả các file JS trong một thư mục
hàm getJsFiles(dir) {
    để kết quả = [];
    danh sách const = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(tệp);
        if (stat && stat.isDirectory()) {
            kết quả = results.concat(getJsFiles(file));
        } khác nếu (path.extname(file) ==='.js') {
            results.push(file);
        }
    });
    trả về kết quả;
}

// Xử lý tất cả các file cần làm xáo trộn
const allFiles = [...filesToObfuscate];
folderToObfuscate.forEach(thư mục => {
    allFiles.push(...getJsFiles(thư mục));
});

allFiles.forEach(filePath => {
    mã const = fs.readFileSync(filePath,'utf8');
    const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
        ...obfuscationOptions,
        sourceMapFileName: `${path.basename(filePath)}.map`,
        inputFileName: path.basename(filePath)
    });

    const outFilePath = path.join(outputDir, filePath);
    const outDirPath = path.dirname(outputFilePath);

    // Đảm bảo thư mục chứa file đầu ra tồn tại
    if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
    }

    fs.writeFileSync(outputFilePath, obfuscationResult.getObfuscatedCode());
    console.log(`sự xáo trộn đã hoàn thành: ${filePath} -> ${outputFilePath}`);
});

console.log('Tất cả việc xáo trộn tập tin đã hoàn tất!');
