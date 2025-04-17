// CreatePollForm.js
import React, { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { useMutation } from "react-query";
import createPollService from "../services/createPollService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreatePollForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");
  const navigate = useNavigate();

  const handleAddOption = () => {
    if (optionInput.trim() === "") {
      toast.warning("Please enter an option before adding");
      return;
    }
    if (options.includes(optionInput)) {
      toast.warning("This option already exists");
      return;
    }
    setOptions((prev) => [...prev, optionInput]);
    setOptionInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddOption();
    }
  };

  const handleClearPoll = () => {
    setTitle("");
    setDescription("");
    setOptions([]);
    setOptionInput("");
  };

  const mutation = useMutation(createPollService, {
    onSuccess: (data) => {
      const message = data?.message || "Poll created successfully";
      toast.success(message);
      handleClearPoll();
      navigate(`/view/${data?.data?._id}`);
    },
    onError: (error) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ||
        "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  const handlePollSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "" || options.length < 2) {
      toast.error("Title, description and at least 2 options are required");
      return;
    }
    mutation.mutate({ title, description, options });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">Create New Poll</h1>
          <p className="text-gray-600">Fill in the details below to create your poll</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Title & Description */}
          <div className="space-y-6">
            {/* Poll Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Poll Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your poll about?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            {/* Poll Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what this poll is for..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition min-h-[120px]"
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Right Column - Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Options (Minimum 2) *
            </label>

            <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto pr-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center group">
                  <div className="flex-1 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 flex items-center">
                    <span className="text-gray-500 mr-2">{index + 1}.</span>
                    <span className="text-gray-800">{option}</span>
                  </div>
                  {options.length > 2 && (
                    <button
                      className="ml-2 p-2 text-gray-400 hover:text-red-500 transition"
                      title="Remove option"
                      onClick={() =>
                        setOptions(options.filter((_, i) => i !== index))
                      }
                    >
                      <FaTrashAlt className="text-sm" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Option */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={optionInput}
                onChange={(e) => setOptionInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter new option"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center"
                onClick={handleAddOption}
                disabled={!optionInput.trim()}
              >
                <FaPlus className="mr-1" /> Add
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter or click Add to include the option
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            onClick={() => {
              const sure = window.confirm(
                "Are you sure you want to clear the poll? All entered data will be lost."
              );
              if (sure) {
                handleClearPoll();
              }
            }}
          >
            Clear Form
          </button>
          <button
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-md disabled:opacity-70"
            onClick={handlePollSubmit}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Creating..." : "Create Poll"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePollForm;