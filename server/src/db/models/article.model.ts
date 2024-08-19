import mongoose, { Date, Document, Schema } from 'mongoose';

import { marked } from 'marked';
import createDomPurify from 'dompurify';
import { JSDOM } from 'jsdom';
const dompurify = createDomPurify(new JSDOM().window);

interface Blog extends Document {
    title: string;
    description: string;
    createdAt: Date;
    markdown: string;
    sanitizedHTML: string;
}

const articleSchema = new Schema<Blog>({
    title: { type: String, required: true },
    description: { type: String },
    markdown: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    sanitizedHTML: { type: String },
});

articleSchema.pre('validate', function (next) {
    if (this.markdown) {
        this.sanitizedHTML = dompurify.sanitize(
            marked(this.markdown, { async: false })
        );
    }

    next();
});

export default mongoose.model('Article', articleSchema);
