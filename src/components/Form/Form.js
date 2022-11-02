import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons"


function Form({ listElement, setListElement, leftNonCheckedItem }) {
    const initialInput = "";
    const [inputText, setInputText] = useState(initialInput);

    // ****************************************

    const inputOnChange = (e) => {
        setInputText(e.target.value);
    };

    // ****************************************
    const onSubmit = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (listElement.every((element) => { return (element.name.toLowerCase() !== inputText.toLowerCase()) })
                && (inputText.trim() !== "")) {
                setListElement([...listElement, { name: inputText, isChecked: "nonChecked" }]);
            }
            setInputText(initialInput);
        }
    };

    // ****************************************

    const checkAll = (e) => {
        e.preventDefault();

        if (leftNonCheckedItem === 0) {
            listElement.map((element) => {
                element.isChecked = "nonChecked"
                return element;
            })
        }
        else {
            listElement.map((element) => {
                element.isChecked = "Checked"
                return element;
            })
        }
        setListElement([...listElement]);
    }

    // ****************************************

    return (
        <form>
            <button className={listElement.length === 0 ? 'invisible' : ''} onClick={checkAll}>
                <FontAwesomeIcon icon={faAnglesDown} />
            </button>
            <input
                value={inputText}
                onKeyPress={onSubmit}
                onChange={inputOnChange}
                placeholder='What need to be done' />
        </form>
    )
}
export default Form