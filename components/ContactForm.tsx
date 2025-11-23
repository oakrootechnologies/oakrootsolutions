'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import CustomDropdown from './CustomDropdown';
import { saveFormSubmission } from '@/utils/formStorage';

// Services list matching OurServicesSection
const services = [
  'Branding',
  'UI/UX Design',
  'Web Design',
  'Search Engine Optimization',
  'Mobile Apps',
  'AI Automations',
  'Digital Marketing',
];

// Time of day options
const timeSlots = [
  'Morning (9 AM - 12 PM)',
  'Afternoon (12 PM - 5 PM)',
  'Evening (5 PM - 8 PM)',
  'Flexible / Any Time',
];

interface FormData {
  name: string;
  email: string;
  contact: string;
  preferredTime: string;
  website: string;
  query: string;
  aboutProduct: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    contact: '',
    preferredTime: '',
    website: '',
    query: '',
    aboutProduct: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: '-100px' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Save form submission to storage
      saveFormSubmission({
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        preferredTime: formData.preferredTime,
        website: formData.website,
        query: formData.query,
        aboutProduct: formData.aboutProduct,
      });

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          contact: '',
          preferredTime: '',
          website: '',
          query: '',
          aboutProduct: '',
        });
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={formRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="w-full bg-white text-black py-8 lg:py-24 px-4 lg:px-0"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-8 lg:mb-12">
          <h3 className="text-base lg:text-xl font-medium underline mb-3 lg:mb-4">Contact Form</h3>
          <h2 className="text-3xl lg:text-7xl font-bold leading-tight">
            Let&apos;s start a conversation.
          </h2>
          <p className="text-sm lg:text-lg text-neutral-600 mt-4 lg:mt-6 max-w-2xl">
            Tell us about your project and we&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="space-y-6 lg:space-y-8"
        >
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Name Field */}
            <motion.div
              variants={itemVariants}
              className="group"
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 transition-colors group-focus-within:text-black"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 lg:py-3 bg-transparent border-b-2 border-gray-300 focus:border-black outline-none transition-all duration-300 text-base lg:text-lg placeholder:text-gray-400 focus:placeholder:text-gray-500"
                placeholder="Your full name"
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              variants={itemVariants}
              className="group"
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 transition-colors group-focus-within:text-black"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 lg:py-3 bg-transparent border-b-2 border-gray-300 focus:border-black outline-none transition-all duration-300 text-base lg:text-lg placeholder:text-gray-400 focus:placeholder:text-gray-500"
                placeholder="your.email@example.com"
              />
            </motion.div>
          </div>

          {/* Contact Field */}
          <motion.div
            variants={itemVariants}
            className="group"
          >
            <label
              htmlFor="contact"
              className="block text-sm font-medium mb-2 transition-colors group-focus-within:text-black"
            >
              Contact Number <span className="text-red-500">*</span>
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-black outline-none transition-all duration-300 text-lg placeholder:text-gray-400 focus:placeholder:text-gray-500"
              placeholder="+1 234 567 8900"
            />
          </motion.div>

          {/* Preferred Time Field */}
          <motion.div
            variants={itemVariants}
            className="group"
          >
            <CustomDropdown
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={(value) => handleDropdownChange('preferredTime', value)}
              options={timeSlots}
              placeholder="Select a time slot"
              required
              label="Preferred Time to Reach"
            />
          </motion.div>

          {/* Website Field */}
          <motion.div
            variants={itemVariants}
            className="group"
          >
            <label
              htmlFor="website"
              className="block text-sm font-medium mb-2 transition-colors group-focus-within:text-black"
            >
              Existing Business Website <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-black outline-none transition-all duration-300 text-lg placeholder:text-gray-400 focus:placeholder:text-gray-500"
              placeholder="https://www.yourwebsite.com"
            />
          </motion.div>

          {/* Query Field (Services) */}
          <motion.div
            variants={itemVariants}
            className="group"
          >
            <CustomDropdown
              id="query"
              name="query"
              value={formData.query}
              onChange={(value) => handleDropdownChange('query', value)}
              options={services}
              placeholder="Select a service"
              required
              label="Your Query (Service Domain)"
            />
          </motion.div>

          {/* About Product/Company Field */}
          <motion.div
            variants={itemVariants}
            className="group"
          >
            <label
              htmlFor="aboutProduct"
              className="block text-sm font-medium mb-2 transition-colors group-focus-within:text-black"
            >
              Tell us about your product or company <span className="text-red-500">*</span>
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              id="aboutProduct"
              name="aboutProduct"
              value={formData.aboutProduct}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2.5 lg:py-3 bg-transparent border-b-2 border-gray-300 focus:border-black outline-none transition-all duration-300 text-base lg:text-lg resize-none placeholder:text-gray-400 focus:placeholder:text-gray-500"
              placeholder="Describe your business, product, goals, and what you're looking to achieve..."
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-6 py-3 lg:px-8 lg:py-4 bg-black text-white font-medium text-sm lg:text-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-h-[44px]"
            >
              <motion.span
                key={submitStatus}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block"
                    >
                      ⟳
                    </motion.span>
                    Submitting...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <span>✓</span>
                    Message Sent!
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <span>✗</span>
                    Error - Try Again
                  </>
                ) : (
                  <>
                    Send Message
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="inline-block"
                    >
                      →
                    </motion.span>
                  </>
                )}
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              <motion.span
                className="absolute inset-0 flex items-center justify-center gap-2 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {!isSubmitting && submitStatus === 'idle' && (
                  <>
                    Send Message
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="inline-block"
                    >
                      →
                    </motion.span>
                  </>
                )}
              </motion.span>
            </motion.button>

            {/* Status Message */}
            {submitStatus === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-green-600 text-sm"
              >
                Thank you! We&apos;ll get back to you soon.
              </motion.p>
            )}
            {submitStatus === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-red-600 text-sm"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}

