import { TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"

class ReviewService extends TransactionBaseService {
    protected manager_: EntityManager
    private productReviewRepository: any;

    constructor({productReviewRepository, manager}) {
        super({productReviewRepository, manager});

        this.manager_ = manager;
        this.productReviewRepository = productReviewRepository;
    }

    async getProductReviews (product_id) {
        const productReviewRepository = this.manager_.withRepository(this.productReviewRepository);
        return await productReviewRepository.findBy({
            product_id: product_id
        });
    }

    async addProductReview (product_id, data) {
        if (!data.title || !data.full_name || !data.content || !data.rating) {
            throw new Error("product review requires title, full_name, content, and rating")
        }

        const productReviewRepository = this.manager_.withRepository(this.productReviewRepository);
        const createdReview = productReviewRepository.create({
            product_id: product_id,
            title: data.title,
            full_name: data.full_name,
            content: data.content,
            rating: data.rating
        })
        const productReview = await productReviewRepository.save(createdReview);

        return productReview
    }
}

export default ReviewService;
