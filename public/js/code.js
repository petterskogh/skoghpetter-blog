const codeBlocks = document.querySelectorAll("pre code");

codeBlocks.forEach((codeBlock) => {
  const code = codeBlock.innerText.trimEnd();
  addCopyButtonToCodeBlock(codeBlock, code);
});

function addCopyButtonToCodeBlock(element, copyText){
	const copyButton = document.createElement("button");
  copyButton.className = "copy";
  copyButton.innerText = "Copy";
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(copyText);
    copyButton.innerText = "Copied!";
    setTimeout(() => {
      copyButton.innerText = "Copy";
    }, 2000);
  });
	element.appendChild(copyButton);
}