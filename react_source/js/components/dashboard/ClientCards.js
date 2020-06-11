import React from 'react';
import Masonry from 'react-masonry-css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function ClientCards(props) {

    const breakpointColumnsObj = {
        default: 3,
        992: 3, // lg
        768: 2, // md
        576: 1 // sm
    };
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
        {props.data.map((item, i) => (
            <Card key={i}>
                <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Card text</Card.Text>
                <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        ))}
        </Masonry>
    )
}


export default ClientCards