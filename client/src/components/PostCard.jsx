import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Eye, MessageCircle, Tag } from 'lucide-react';

const PostCard = ({ post }) => {
  const {
    _id,
    title,
    excerpt,
    slug,
    featuredImage,
    author,
    category,
    tags,
    viewCount,
    comments,
    createdAt,
  } = post;

  return (
    <article className="card hover:shadow-md transition-shadow duration-200">
      {/* Featured Image */}
      {featuredImage && featuredImage !== 'default-post.jpg' && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img
            src={`/uploads/${featuredImage}`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="card-content">
        {/* Category */}
        {category && (
          <div className="mb-3">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${category.color}20`,
                color: category.color,
              }}
            >
              {category.icon} {category.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link
            to={`/posts/${slug || _id}`}
            className="hover:text-primary-600 transition-colors"
          >
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {/* Author */}
            <div className="flex items-center space-x-2">
              {author.avatar && author.avatar !== 'default-avatar.jpg' ? (
                <img
                  src={`/uploads/${author.avatar}`}
                  alt={author.firstName}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-600">
                    {author.firstName?.charAt(0) || author.username?.charAt(0)}
                  </span>
                </div>
              )}
              <span>
                {author.firstName
                  ? `${author.firstName} ${author.lastName}`
                  : author.username}
              </span>
            </div>

            {/* Date */}
            <span>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{viewCount || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{comments?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard; 