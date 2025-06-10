import prismLanguages from '../prismLanguages';

const Dropdown = ({ selectedValue, handleSelectChange }) => {
    return (
        <>
            <label htmlFor='lang'>Language</label>
            <select
                value={selectedValue}
                onChange={handleSelectChange}
                name='lang'
                id='lang'>
                <option default>Select Language</option>
                {Object.entries(prismLanguages).map(([label, value]) => {
                    return <option value={value} key={label}>{label}</option>
                })
                }
            </select>
        </>
    )
}

export default Dropdown