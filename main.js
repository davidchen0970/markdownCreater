const inputTitle = document.getElementById("title");
const inputLink = document.getElementById("link");
const inputDifficulty = document.getElementById("difficulty");
const inputLimit = document.getElementById("limit");
const inputPassRate = document.getElementById("pass-rate");
const inputTimeComplexity = document.getElementById("time-complexity");
const inputSpaceComplexity = document.getElementById("space-complexity");
const inputCode = document.getElementById("code");
const inputStatement = document.getElementById("statement");
const markdownPreview = document.getElementById("markdown-preview");
var difficultyColor = '000000'; //RBG code

function handleLimitInputs() {
    const addBtn = document.getElementById("add-btn");
    const limitsContainer = document.getElementById("limits");

    function createLimitItem() {
        const limitItem = document.createElement("div");
        limitItem.classList.add("limit-item");

        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("limit-input");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "刪除";
        deleteBtn.classList.add("delete-btn");

        limitItem.appendChild(input);
        limitItem.appendChild(deleteBtn);
        limitsContainer.insertBefore(limitItem, addBtn);
    }

    function deleteLimitItem(event) {
        const limitItem = event.target.parentNode;
        limitsContainer.removeChild(limitItem);
    }

    addBtn.addEventListener("click", createLimitItem);
    limitsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            deleteLimitItem(event);
        }
    });
}

function updateDifficultyColor(){
    if(inputDifficulty.value == 'Easy')         difficultyColor = '00AF9B';
    if(inputDifficulty.value == 'Medium')       difficultyColor = 'FFB800';
    if(inputDifficulty.value == 'Hard')         difficultyColor = 'FF375F';
}

handleLimitInputs();

// 修改 updateMarkdownPreview 函式來處理限制的輸入框陣列
function updateMarkdownPreview() {
    updateDifficultyColor();
    const chooseValue = document.getElementById("choose").value;
    const titleValue = inputTitle.value;
    const linkValue = inputLink.value;
    const difficultyValue = inputDifficulty.value;
    const passRateValue = inputPassRate.value;
    const timeComplexityValue = inputTimeComplexity.value;
    const StatementValue = inputStatement.value;
    const spaceComplexityValue = inputSpaceComplexity.value;
    const codeValue = inputCode.value;

    const limitInputs = document.getElementsByClassName("limit-input");
    const limits = [];
    for (const input of limitInputs) {
        limits.push(input.value);
    }

    var markdownContent = `
# [${chooseValue} ${titleValue}](${linkValue})
<font color=#${difficultyColor}>${difficultyValue}</font> ${passRateValue}%
- 限制
    <ul>
        <li><code>${limits.join("</code></li> \n \t\t<li><code>")} </code></li>
    </ul>

- Sulotion
    ${StatementValue}
    - 時間複雜度: $O(${timeComplexityValue})$
    - 空間複雜度: $O(${spaceComplexityValue})$

- 程式碼
\`\`\`c++!=
${codeValue}
\`\`\`
    `;
    const peviewmarkdownContent = markdownContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    markdownPreview.innerHTML = peviewmarkdownContent;
}
function copyMarkdownToClipboard() {
    const markdownContent = document.getElementById("markdown-preview").textContent;
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = markdownContent;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
    alert("已複製 Markdown 內容到剪貼簿！");
  }

  
// 繼續保留原本的 input 監聽事件
inputStatement.addEventListener("input", updateMarkdownPreview);
inputTitle.addEventListener("input", updateMarkdownPreview);
inputLink.addEventListener("input", updateMarkdownPreview);
inputDifficulty.addEventListener("input", updateMarkdownPreview);
inputPassRate.addEventListener("input", updateMarkdownPreview);
inputTimeComplexity.addEventListener("input", updateMarkdownPreview);
inputSpaceComplexity.addEventListener("input", updateMarkdownPreview);
inputCode.addEventListener("input", updateMarkdownPreview);
document.getElementById("copy-btn").addEventListener("click", copyMarkdownToClipboard);


// 原始預覽
//     const markdownContent = `
//   ### 選擇區: ${chooseValue}
//   ### 標題: ${titleValue}
//   ### 標題連結: ${linkValue}
//   ### 難度: ${difficultyValue}
//   ### 限制: ${limits.join(", ")}
//   ### 通過率: ${passRateValue}
//   ### 時間複雜度: ${timeComplexityValue}
//   ### 空間複雜度: ${spaceComplexityValue}
  
//   \`\`\`
//   ${codeValue}
//   \`\`\`
//     `;

//     markdownPreview.innerHTML = markdownContent;