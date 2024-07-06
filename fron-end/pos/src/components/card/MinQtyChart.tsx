import React from "react"
interface MinqtyProduct{
    name:string,
    image:string,
    description:string
}

const MinQtyChart: React.FC<MinqtyProduct>=({name,image,description})=> {

    const minQtyChartStyle:React.CSSProperties={
        maxWidth: '100%'
    }
    return(
        <div className="card" style={minQtyChartStyle}>
            <img src={image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                </div>
        </div>
    )
}

export default MinQtyChart