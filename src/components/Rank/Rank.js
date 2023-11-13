const Rank = ({name, entries}) => {
    return (
        <div className='ma4 mt0'>   
            <div className='white f3'>
                {`${name}, your current entry count is...`}
            </div>
            <div className='white f1'>
                {`${entries}`}
            </div>        
        </div>                
    );
};

export default Rank;