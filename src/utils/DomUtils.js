export default {
    focusAndSelect(el){
        if (!el) return;
        el.focus();
        el.setSelectionRange(0, el.value.length);
    }
}