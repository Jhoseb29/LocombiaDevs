export const productsviewtemplate = (name,price,desarrollador,categoria,likes,imgurl,description,liked) => {
  const html = `<div class="view">
  <img class="productimg" src="${imgurl}"></img>
  <div class="infocontainer">
    <div class="title">
      <h1>${name}</h1>
      <svg id="likebtn" class="iconlike" width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1_667)">
          <path class="${liked}" d="M23.8743 49.5037L23.6099 49.2605L5.08571 32.0579C1.83974 29.0445 0 24.8153 0 20.3851V20.0362C0 12.5926 5.2866 6.20643 12.6032 4.81077C16.7691 4.00721 21.0301 4.96937 24.4241 7.35891C25.3757 8.0356 26.2638 8.81801 27.0674 9.71673C27.5114 9.20922 27.9872 8.744 28.4948 8.3105C28.886 7.97216 29.2877 7.65496 29.7107 7.35891C33.1047 4.96937 37.3657 4.00721 41.5315 4.8002C48.8481 6.19586 54.1347 12.5926 54.1347 20.0362V20.3851C54.1347 24.8153 52.295 29.0445 49.049 32.0579L30.5248 49.2605L30.2605 49.5037C29.3935 50.3072 28.2516 50.7619 27.0674 50.7619C25.8832 50.7619 24.7413 50.3178 23.8743 49.5037ZM25.2805 15.3311C25.2382 15.2994 25.2065 15.2571 25.1748 15.2148L23.2927 13.1002L23.2822 13.0896C20.8398 10.3511 17.1497 9.10349 13.5548 9.79075C8.62772 10.7318 5.07513 15.0245 5.07513 20.0362V20.3851C5.07513 23.3984 6.33334 26.2849 8.54314 28.3361L27.0674 45.5387L45.5916 28.3361C47.8014 26.2849 49.0596 23.3984 49.0596 20.3851V20.0362C49.0596 15.035 45.507 10.7318 40.5905 9.79075C36.9956 9.10349 33.295 10.3617 30.8631 13.0896C30.8631 13.0896 30.8631 13.0896 30.8526 13.1002C30.842 13.1107 30.8526 13.1002 30.842 13.1107L28.96 15.2254C28.9283 15.2677 28.886 15.2994 28.8542 15.3417C28.3784 15.8175 27.7335 16.0818 27.0674 16.0818C26.4013 16.0818 25.7563 15.8175 25.2805 15.3417V15.3311Z" fill="#B6B6B6"/>
          </g>
          <defs>
          <clipPath id="clip0_1_667">
          <rect width="54.1347" height="54.1347" fill="white"/>
          </clipPath>
          </defs>
      </svg>
      <p id="likecount">${likes}</p>
    </div>
    <p class="info">${desarrollador}</p>
    <p class="info">category: ${categoria}</p>
    <p class="info">price: $${price}</p>
    <div class="btns">
      <button class="buybtn">buy</button>
      <button class="addbtn">add<img class="iconcart" src="../assets/images/Buy.svg"></img></button>
    </div>
    <span class="errorms">there is no stock of the product</span>
  </div>
</div>
<div class="description">${description}</div>`;
  return html;
};
