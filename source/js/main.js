var elements = document.querySelectorAll("is-i.φce, header.φcv, div.φdl");
console.log('@', elements[0]);
for (var i = 0; i < elements.length; i++) {
    element = elements[i];
    element.classList.add("ripple");
};
