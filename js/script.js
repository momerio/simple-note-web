function getCookieArray() {
    let arr = new Array();
    if (document.cookie != "") {
        let tmp = document.cookie.split("; ");
        for (let i = 0; i < tmp.length; i++) {
            let data = tmp[i].split("=");
            arr[data[0]] = decodeURIComponent(data[1]);
        }
    }
    return arr;
}

function downloadButtonClick() {
    const cookieArray = getCookieArray();
    const text = cookieArray["text"];

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = 'simpleMemo.txt';
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    infoArea.innerText = "テキストファイルをダウンロードしています";

}

function deleteButtonClick() {
    const deleteFlag = confirm("削除しますか?");

    if (deleteFlag) {
        reviewTextarea.value = "";
        document.cookie = "text=" + "";

        infoArea.innerText = "削除しました";
    }
}

function addTextArea() {
    const cookieArray = getCookieArray();
    const text = cookieArray["text"];
    reviewTextarea.value = text;
}

function addTextFromCookie() {
    const text = reviewTextarea.value;
    const encodedText = encodeURIComponent(text);
    document.cookie = "text=" + encodedText + ";" + "expires=" + limitedDate + ";";

    infoArea.innerText = "";
}

const cookieLimited = 30; //Cookieの期限(30日)
let nowDate = new Date();
nowDate.setTime(nowDate.getTime() + cookieLimited * 24 * 60 * 60 * 1000);
const limitedDate = nowDate.toGMTString();


let reviewTextarea = document.getElementById("reviewTextarea");
let infoArea = document.getElementById("infoArea");

let deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", deleteButtonClick);

let downloadButton = document.getElementById("saveButton");
downloadButton.addEventListener("click", downloadButtonClick);

// Cookieが無いときundefinedが表示されないようにする
if (document.cookie == "") {
    document.cookie = "text=";
}

addTextArea(); //初期状態でCookie呼び出し