const Rank = ({name, entries}) => {
    const capitalizeFirstLetter = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    return (
        <div className='ma4 mt0'>   
            <div className='white f3'>
                {`${capitalizeFirstLetter(name)}, your current entry count is...`}
            </div>
            <div className='white f1'>
                {`${entries}`}
            </div>        
        </div>                
    );
};

export default Rank;