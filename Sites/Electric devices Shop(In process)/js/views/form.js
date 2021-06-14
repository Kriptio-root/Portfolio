/**
 *Function show error
 * @param {HTMLInputElement} el
 */
export function showInputError(el){
    const parent=el.parentElement;
    const msg=el.dataset.invalidMessage||'Invalid input';
    return msg;

}