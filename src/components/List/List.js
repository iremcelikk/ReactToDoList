import { useState, useEffect } from 'react'
import Form from '../Form/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons"

let isFilteredActive = false;
let isFilteredCompleted = false;
let isFilteredAll = false;


function List() {

    const [listElement, setListElement] = useState(JSON.parse(localStorage.getItem("list")) || [])
    const [showedListElement, setshowedListElement] = useState([])

    // ****************************************

    useEffect(() => {
        setshowedListElement([...listElement])
        localStorage.setItem("list", JSON.stringify(listElement))
        if (isFilteredActive) {
            filterActive();
        }
        else if (isFilteredCompleted) {
            filterCompleted();
        }
        else if (isFilteredAll) {
            filterAll();
        }
        // eslint-disable-next-line
    }, [listElement])

    // ****************************************

    const checkElement = (e) => {

        listElement.map((element, i) => {
            if (JSON.parse(e.target.id).name === element.name && element.isChecked === "nonChecked")
                element.isChecked = "Checked";
            else if (JSON.parse(e.target.id).name === element.name && element.isChecked === "Checked")
                element.isChecked = "nonChecked";
            return element;
        })
        setListElement([...listElement]);

    };

    // ****************************************

    const deleteElement = (e) => {

        const index = listElement.findIndex((element) =>
            element.name === JSON.parse(e.target.id).name);

        listElement.splice(index, 1);
        setListElement([...listElement]);

    }

    // ****************************************

    const leftNonCheckedItem = listElement.filter((element) => {
        return (element.isChecked === "nonChecked")
    }).length;

      // ****************************************

    const isThereCompletedItem = listElement.filter((element) => {
        return (element.isChecked === "Checked")
    }).length;

      // ****************************************

    const clearChecked = () => {
        const willBeDeleted = [];
        for (let i = 0; i < listElement.length; i++)
            if (listElement[i].isChecked === "Checked")
                willBeDeleted.push(listElement.indexOf((listElement[i])))

        for (let i = willBeDeleted.length - 1; i >= 0; i--)
            listElement.splice(willBeDeleted[i], 1);

        setListElement([...listElement]);

    };

      // ****************************************

    const filterActive = () => {

        isFilteredActive = true;
        isFilteredCompleted = false;
        isFilteredAll = false;

        const activeElements = listElement.filter((element) => {
            return element.isChecked === "nonChecked"
        })
        console.log(activeElements)
        setshowedListElement([...activeElements]);
    }

       // ****************************************

    const filterCompleted = () => {

        isFilteredCompleted = true;
        isFilteredActive = false;
        isFilteredAll = false;


        const completedElements = listElement.filter((element) => {
            return element.isChecked === "Checked"
        })
        setshowedListElement([...completedElements]);
    }

     // ****************************************

    const filterAll = () => {

        isFilteredAll = true;
        isFilteredActive = false;
        isFilteredCompleted = false;

        setshowedListElement([...listElement]);
    }

      // ****************************************

    return (
        <div className='container'>
            <Form listElement={listElement} setListElement={setListElement} leftNonCheckedItem={leftNonCheckedItem} />
            <ul>
                {showedListElement.map((element, i) => (
                    <li
                        id={i}
                        key={i}>
                        <div>
                            <button id={JSON.stringify(element)}
                                onClick={checkElement}
                                className={element.isChecked}
                            ><FontAwesomeIcon icon={faCheck} /></button>
                            <span className={element.isChecked}>{element.name}</span>
                        </div>
                        <button
                            className='deleteButton'
                            id={JSON.stringify(element)}
                            onClick={deleteElement}> <FontAwesomeIcon icon={faClose} />
                        </button>
                    </li>
                ))}
            </ul>
            <footer className={listElement.length === 0 ? 'invisible' : ''}>
                <span>{leftNonCheckedItem} {leftNonCheckedItem > 1 ? "items" : "item"} left</span>
                <div>
                    <button onClick={filterAll}>All</button>
                    <button onClick={filterActive}>Active</button>
                    <button onClick={filterCompleted}>Completed</button>
                </div>
                <button className={isThereCompletedItem === 0 ? 'invisible' : ''} onClick={clearChecked}>Clear Completed</button>
            </footer>
        </div>
    )
}
export default List