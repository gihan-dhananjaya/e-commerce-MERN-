import React from "react";

interface DefaultCardData{
    image:string,
    title:string,
    description:string,
    qty:number | undefined,
    cardKey:number
}

const DefaultCard : React.FC<DefaultCardData>=({image,title,description,qty,cardKey})=>{
    const defaultCardStyle:React.CSSProperties={
        width: '100%'
    }
    return(
        <div className="card mb-3" style={defaultCardStyle} key={cardKey}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={image} className="img-fluid rounded-start" alt="..." style={{height:'100%'}}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">quantity:{qty}</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DefaultCard

/* function DefaultCard(props:DefaultCardData) {

    const defaultCardStyle:React.CSSProperties={
        maxWidth: '540px'
    }
    return(
        <div className="card mb-3" style={defaultCardStyle} key={props.key}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={props.image} className="img-fluid rounded-start" alt="..." style={{height:'100%'}}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.description}</p>
                        <p className="card-text"><small className="text-body-secondary">quantity:{props.qty}</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DefaultCard */