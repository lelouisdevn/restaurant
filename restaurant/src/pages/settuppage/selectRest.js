import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const SelectRest = () => {
    const navigator = useNavigate();
    const createRest = () => {
        navigator("/setting-up/restaurant/new");
    }


    /**
     * INTERNAL LOGIC starts below:
     */






    /**
     * HTML template;
    */
    return (
        <>
            <div>
                Chọn 1 nhà hàng
            </div>
            <div className='main-content'>
                <div>Saga Restaurant</div>
                <div>Tuyen Dang Restaurant</div>
                <div>Louis The Dev Restaurant</div>
                <div>Dnomaid cafeteria</div>
                <div>Cydiu9 4c9u0r9u04</div>
                <div>Licb 74c89bxrcryh98yry</div>
            </div>
            <div className='footer' onClick={createRest}>
                <FontAwesomeIcon icon={faGear} />
                <> Thêm nhà hàng khác</>
            </div>
        </>
    )
}

export default SelectRest;