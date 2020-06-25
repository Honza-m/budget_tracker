import React from 'react';
import {Link, useParams} from 'react-router-dom';
import Masonry from 'react-masonry-css';
import Card from 'react-bootstrap/Card';


function CampaignCards(props) {
    const breakpointColumnsObj = {
        default: 3,
        992: 3, // lg
        768: 2, // md
        576: 1 // sm
    };
    const {pk} = useParams();
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
        {props.data.map((item, i) => (
            <Card key={i}>
                <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    Currency: {item.currency} <br />
                    Is filtered: {item.name_filter ? 'Yes': 'No'}    
                </Card.Text>
                <Link 
                    className="btn btn-primary"
                    to={`/clients/${pk}/campaigns/${item.id}/`}
                >
                    Details
                </Link>
                </Card.Body>
            </Card>
        ))}
        </Masonry>
    )
}

export default CampaignCards