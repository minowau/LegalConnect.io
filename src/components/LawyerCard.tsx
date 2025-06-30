import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Briefcase, Phone, Calendar } from 'lucide-react';
import { Lawyer } from '../types/lawyer';

interface LawyerCardProps {
  lawyer: Lawyer;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={lawyer.photo}
            alt={lawyer.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{lawyer.name}</h3>
            <p className="text-primary-600 font-medium mb-2">{lawyer.specialization}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <Briefcase className="h-4 w-4" />
                <span>{lawyer.experience} years</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{lawyer.location}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(lawyer.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {lawyer.rating} ({lawyer.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lawyer.bio}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">${lawyer.hourlyRate}/hr</span>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 bg-secondary-100 text-secondary-700 px-3 py-1 rounded-lg hover:bg-secondary-200 transition-colors text-sm">
              <Phone className="h-3 w-3" />
              <span>Call</span>
            </button>
            <Link
              to={`/lawyers/${lawyer.id}`}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;