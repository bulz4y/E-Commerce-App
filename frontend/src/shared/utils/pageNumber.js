const items = 4;
let skip = 0;
let endPage = false;

function increment() {
    skip += items;
};

function resetPage() {
    skip = 0;
    endPage = false;
}

function setEndPage() {
    endPage = true;
}

export {
    items,
    skip,
    increment,
    resetPage,
    endPage,
    setEndPage
};