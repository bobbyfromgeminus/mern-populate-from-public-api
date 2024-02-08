const CatDataComponent = ( { selectedCat, breeders } ) => {

    return (
        <div className="cat-datasheet">

            <div    className="image"
                    style={{backgroundImage: `url("${selectedCat.img_url}")` }}>
            </div>

            <div className="cat-data">
                <h2>{selectedCat.name}</h2>

                <table>
                    <tbody>
                        <tr>
                            <td>origin:</td>
                            <td>{selectedCat.origin}</td>
                        </tr>
                        <tr>
                            <td>life span:</td>
                            <td>{selectedCat.life_span} years</td>
                        </tr>
                        <tr>
                            <td>weight metric:</td>
                            <td>{selectedCat.weight_metric} kg</td>
                        </tr>
                        <tr>
                            <td>temperament:</td>
                            <td>{selectedCat.temperament}</td>
                        </tr>
                    </tbody>
                </table>

                <p>{selectedCat.description}</p>
            </div>
            
            <div className="breeder-data">
                {breeders.map((breeder, index) => (
                    <div className="breeder-card w-100" key={index}>
                        <h2>{breeder.name}</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>country:</td>
                                    <td><b>{breeder.country}</b></td>
                                </tr>
                                <tr>
                                    <td>address:</td>
                                    <td>{breeder.address}</td>
                                </tr>
                                <tr>
                                    <td>phone:</td>
                                    <td>{breeder.phone}</td>
                                </tr>
                                <tr>
                                    <td>email:</td>
                                    <td><a href={`mailto: ${breeder.email}`}>{breeder.email}</a></td>
                                </tr>
                                <tr>
                                    <td>web:</td>
                                    <td><a href={breeder.web} target="_blank" rel="noreferrer">{breeder.web}</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default CatDataComponent;