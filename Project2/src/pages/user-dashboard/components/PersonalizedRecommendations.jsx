import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PersonalizedRecommendations = ({ recentlyViewed, recommendations }) => {
  return (
    <div className="space-y-6">
      {/* Recently Viewed */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground">Recently Viewed</h2>
          <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentlyViewed?.map((item) => (
            <div key={item?.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-2">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <button className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Icon name="Heart" size={14} className="text-muted-foreground hover:text-error" />
                </button>
              </div>
              <h3 className="text-sm font-medium text-card-foreground truncate">
                {item?.name}
              </h3>
              <p className="text-sm font-bold text-primary">
                ${item?.price}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Recommended for You */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground">Recommended for You</h2>
          <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendations?.map((item) => (
            <div key={item?.id} className="flex items-center space-x-4 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors duration-200 cursor-pointer group">
              <div className="flex-shrink-0">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-16 h-16 object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-card-foreground truncate">
                  {item?.name}
                </h3>
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < Math.floor(item?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({item?.reviews})
                  </span>
                </div>
                <p className="text-sm font-bold text-primary">
                  ${item?.price}
                </p>
              </div>
              <button className="p-2 rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Icon name="Plus" size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;