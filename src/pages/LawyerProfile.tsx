import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Briefcase, 
  Phone, 
  Mail, 
  Calendar,
  Clock,
  CheckCircle,
  Award,
  GraduationCap
} from 'lucide-react';
import { mockLawyers } from '../data/mockLawyers';

const LawyerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const lawyer = mockLawyers.find(l => l.id === id);

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lawyer not found</h2>
          <p className="text-gray-600">The lawyer profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const availableDates = [
    '2025-01-20',
    '2025-01-21',
    '2025-01-22',
    '2025-01-23',
    '2025-01-24'
  ];

  const availableTimes = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <img
                  src={lawyer.photo}
                  alt={lawyer.name}
                  className="w-32 h-32 rounded-lg object-cover mx-auto md:mx-0"
                />
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{lawyer.name}</h1>
                  <p className="text-xl text-primary-600 font-semibold mb-3">{lawyer.specialization}</p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{lawyer.experience} years experience</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{lawyer.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>${lawyer.hourlyRate}/hour</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
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

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      <Phone className="h-4 w-4" />
                      <span>Call Now</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 bg-secondary-100 text-secondary-700 px-6 py-2 rounded-lg hover:bg-secondary-200 transition-colors">
                      <Mail className="h-4 w-4" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{lawyer.bio}</p>
              <p className="text-gray-600">
                With over {lawyer.experience} years of experience in {lawyer.specialization.toLowerCase()}, 
                I have successfully represented hundreds of clients and achieved favorable outcomes in complex cases. 
                My approach combines thorough legal knowledge with personalized attention to each client's unique situation.
              </p>
            </div>

            {/* Credentials */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Credentials & Education</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <GraduationCap className="h-5 w-5 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Harvard Law School</h3>
                    <p className="text-gray-600">Juris Doctor, 2010</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">State Bar Certification</h3>
                    <p className="text-gray-600">Licensed to practice in New York State</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Professional Memberships</h3>
                    <p className="text-gray-600">American Bar Association, New York State Bar</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Client Reviews</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">5.0</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-1">
                      "Excellent representation and communication throughout my case. Highly recommended!"
                    </p>
                    <p className="text-xs text-gray-500">- Client Review</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Book Consultation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book a Consultation</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Choose a date</option>
                    {availableDates.map(date => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={!selectedDate}
                  >
                    <option value="">Choose a time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Consultation Fee:</span>
                    <span className="font-medium text-gray-900">${lawyer.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="font-medium text-gray-900">1 hour</span>
                  </div>
                </div>

                <button
                  disabled={!selectedDate || !selectedTime}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Consultation</span>
                </button>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Free 15-minute phone consultation available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfile;