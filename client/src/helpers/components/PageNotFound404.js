import React from 'react';

import { Breadcrumb, Button, Col, Container, Image, Row } from 'react-bootstrap';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { Card, Divider } from '@material-ui/core';

export default function PageNotFound404() {
    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Page Not Found</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Card raised className='py-4 text-center'>
                    <Col className='m-auto'>
                        <Row>
                            <Col xs={12} md={6}>
                                <h1>
                                    <Image
                                        src='https://via.placeholder.com/150'
                                        alt='Ecommerce'
                                        height='50px'
                                        className='mr-3'
                                    />
                                    <b>Ecommerce</b>
                                </h1>
                                <h6 className='text-muted'>Page not found ...</h6>
                                <h5 className='my-4'>
                                    We're sorry, but it looks like you are lost&nbsp;
                                    <SearchIcon />
                                    <br />
                                    <br /> The Web address you entered is not a functioning page on our site.
                                </h5>
                                <Link to='/'>
                                    <Button variant='success' size='lg'>
                                        <HomeRoundedIcon />
                                        &nbsp;
                                        <strong>GO TO HOME</strong>
                                    </Button>
                                </Link>
                            </Col>
                            <Col md={1}>
                                <Divider orientation='vertical' />
                            </Col>
                            <Col md={5} className='m-auto'>
                                <Image
                                    src='https://blog.thomasnet.com/hs-fs/hubfs/shutterstock_774749455.jpg?width=600&name=shutterstock_774749455.jpg'
                                    alt='404'
                                    fluid
                                />
                            </Col>
                        </Row>
                    </Col>
                </Card>
            </Row>
        </Container>
    );
}
