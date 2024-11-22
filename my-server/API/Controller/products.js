const Product = require('../Models/products')
const mongoose = require('mongoose')

exports.get_all_products = (req, res, next) => {

    Product.find() // show all products
        .select('_id name price productImage description')
        .exec()
        .then(docs => {
            console.log(docs)

            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        description: doc.description
                    }
                })
            }
            if (docs.length >= 0) {
                res.status(200).json(response)
            } else {
                res.status(404).json({ message: "No Data found" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err })
        });
};

exports.create_product = (req, res, next) => {

    //Store data into DB
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        productImage: req.file.path
    });

    product.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: "Added Product Successfully..",
            createdProduct: {
                name: result.name,
            }
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    });

};

exports.get_product_by_name = (req, res, next) => {
    const name = req.params.name;

    if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Search term cannot be empty" }); // Return a 400 Bad Request
    }

    Product.find({ name: { $regex: name, $options: 'i' } }) // Use `find` for multiple matches
        .select('_id name price productImage description')
        .exec()
        .then(docs => {
            if (docs.length > 0) {
                const response = {
                    count: docs.length,
                    products: docs.map(doc => {
                        return {
                            name: doc.name,
                            price: doc.price,
                            _id: doc._id,
                            productImage: doc.productImage,
                            description: doc.description
                        };
                    })
                };
                res.status(200).json(response);
            } else {
                res.status(404).json({ message: "No Data found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
};

exports.update_product = (req, res, next) => {
    const id = req.params.productId;


    const updateOps = {};

    // Handle form fields from req.body
    for (const [key, value] of Object.entries(req.body)) {
        updateOps[key] = value;
    }

    // If a file is uploaded, include its path in the update
    if (req.file) {
        updateOps.productImage = req.file.path;
    }

    console.log("Update Operations: ", updateOps);

    // Update the product in the database
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log("Result:", updateOps)
            res.status(200).json({
                message: "Product Updated Successfully.",
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};



exports.delete_product = (req, res, next) => {

    const id = req.params.productId
    Product.deleteOne({ _id: id }) // delete product by id
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product Deleted.",

            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });
};