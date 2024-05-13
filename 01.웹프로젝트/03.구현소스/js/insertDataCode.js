// 배너 이미지와 설명
const bannerUl = document.querySelector(".banner-ul");
const bannerDescOl = document.querySelector(".banner-desc>ol");
let bannerImageCode = ``;
let bannerDescCode = ``;

for(let item in event_info){
    bannerImageCode += `<li>
        <img src="${event_info[item]["src"]}" alt="${event_info[item]["tit"]}안내">
    </li>`;
    bannerDescCode += `<li>
        <h1 class="tit">${event_info[item]["tit"]}</h1>
        <p class="txt">${event_info[item]["cont"]}</p>
    </li>`;
}
bannerUl.innerHTML = bannerImageCode;
bannerDescOl.innerHTML = bannerDescCode;

// 무한스크롤 이미지
const scrollBannerUl = document.querySelector('.scroll-banner-box>ul');
let scrollBannerCode = '';
//<li><img src="" alt=""></li>
for(let x = 0; x<2; x++){
    banner_img.forEach(ele=>{
        // console.log(ele);
        scrollBannerCode += `
        <li><img src="${ele.src}" alt="${ele.alt}"></li>
        `;
    });
}////////////for문////////////////////
// console.log(hcode);
// 데이터 넣기
scrollBannerUl.innerHTML = scrollBannerCode;


// 인기상품 데이터
let hotItemOl = document.querySelector('.hot-item-list>ol');
let hotItemCode = '';
for(let x = 1; x < 5; x++){
    hotItemCode += `
    <li>
        <div class="partbox">
            <div class="img-box">
                <img src="${prod_info["prod0"+x]["src"]}" alt="${prod_info["prod0"+x]["prod_name"]}이미지">
            </div>
            <div class="txt-box">
                <ul>
                    <li class="prod-name">${prod_info["prod0"+x]["prod_name"]}</li>
                    <li class="prod-price">${prod_info["prod0"+x]["prod_price"]}</li>
                    <li class="prod-tag">${prod_info["prod0"+x]["prod_tag"]}</li>
                </ul>
            </div>
        </div>
    </li>
    `;
}; //////////////for//////////////
hotItemOl.innerHTML = hotItemCode;


// 리뷰 데이터
let reviewOl = document.querySelector('.review-list>ol');
// 코드변수
let reviewCode = '';
// console.log(review);
for(let x = 1; x < 5; x++){
    // 데이터 넣기
    reviewCode += `
    <li>
        <div class="partbox">
            <div class="txt-box">
                <ul>
                    <li class="reviewer">${review_info["review0"+x]["reviewer"]}</li>
                    <li class="review-txt">${review_info["review0"+x]["review_txt"]}</li>
                    <li class="prod-tag">${review_info["review0"+x]["review_tag"]}</li>
                </ul>
            </div>
            <div class="img-box">
                <img src="${review_info["review0"+x]["src"]}" alt="상품이미지1">
            </div>
        </div>
        </li>
        `;
} //////////////for/////////////
reviewOl.innerHTML = reviewCode;