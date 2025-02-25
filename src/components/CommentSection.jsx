import React from 'react';

function CommentSection({ comments }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comentarios ({comments.length})</h2>
      <div className="border-t border-gray-200 pt-4">
        {comments.map(comment => (
          <div key={comment.id} className="bg-gray-50 rounded-lg p-4 mb-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold">
                {comment.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-700">{comment.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{comment.email}</p>
                <p className="text-gray-700">{comment.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;