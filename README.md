# medusa-plugin-reviews

## `Work in progress!!`

Product reviews plugin for Medusa ecommerce server.

## Configuration

Enable in your medusa-config.js file similar to other plugins:

```js
const plugins = [
    // ... other plugins
    `medusa-plugin-product-reviews`,
]
```
## Usage

In your MedusaJS backend you can add a new API endpoint to handle reviews.
A small example how this could be done.

```ts
import express, { Router } from "express"
import cors from "cors"
// @ts-ignore
import { projectConfig } from "../../medusa-config"

export default () => {
    const router = Router()
    const storeCorsOptions = {
        origin: projectConfig.store_cors.split(","),
        credentials: false,
    }
    router.use(express.json())
    router.use(express.urlencoded({ extended: true }))
    router.get("/store/products/:id/reviews", cors(storeCorsOptions), (req, res) => {
        const productReviewService = req.scope.resolve("reviewService")
        productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
            return res.json({
                product_reviews
            })
        })
    })
    router.options("/store/products/:id/reviews", cors(storeCorsOptions))
    router.post("/store/products/:id/reviews", cors(storeCorsOptions), (req, res) => {
        const productReviewService = req.scope.resolve("reviewService")
        productReviewService.addProductReview(req.params.id, req.body.data).then((product_review) => {
            return res.json({
                product_review
            })
        })
    })

    // This is an example of how to add a new endpoint for the admin to gather reviews and display them in on the product page.
    const corsOptions = {
        origin: projectConfig.admin_cors.split(","),
        credentials: true,
    }
    router.options("/admin/products/:id/reviews", cors(corsOptions))
    router.get("/admin/products/:id/reviews", cors(corsOptions), async (req, res) => {
        const productReviewService = req.scope.resolve("reviewService")
        productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
            return res.json({
                product_reviews
            })
        })
    })

    return router;
}
```
