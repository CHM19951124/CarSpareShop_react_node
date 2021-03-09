import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = ({ match }) => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = userId => {
        getProducts(userId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts(match.params.userId);
            }
        });
    };

    useEffect(() => {
        loadProducts(match.params.userId);
    }, []);

    return (
        <Layout
            title="Manage Products"
            description="Perform CRUD on products"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {products.length} products
                    </h2>
                    <hr />
                    {/*<tbody>*/}
                    {/*    {products.map((p, i) => (*/}
                    {/*        <div*/}
                    {/*            key={i}*/}
                    {/*            className="list-group-item d-flex justify-content-between align-items-center"*/}
                    {/*        >*/}
                    {/*            <strong >{p.name}</strong>*/}
                    {/*            <Link className="w3-bar-item w3-button w3-right" to={`/admin/product/update/${p._id}`}>*/}
                    {/*                <button className="w3-bar-item w3-button">*/}
                    {/*                    Update*/}
                    {/*                </button>*/}
                    {/*            </Link>*/}
                    {/*            <button className="w3-bar-item w3-button w3-right" onClick={() => destroy(p._id)}>*/}
                    {/*                Delete*/}
                    {/*            </button>*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</tbody>*/}
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>Update</th>
                            <th>Delete</th>

                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category.name}</td>
                                <td>
                                        <Link style={{backgroundColor:"green",color:"white"}} className="w3-bar-item w3-button" to={`/admin/product/update/${product._id}`}>
                                            Update
                                        </Link>
                                </td>
                                <td>
                                    <Link
                                        style={{backgroundColor:"green",color:"white"}}
                                        className="w3-bar-item w3-button"
                                        onClick={() => destroy(product._id)}>
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;
