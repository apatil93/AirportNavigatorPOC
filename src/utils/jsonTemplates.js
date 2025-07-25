// JSON Request Templates for the Chatbot
export const jsonTemplates = {
  greeting: {
    type: "greeting",
    message: "Hello",
    user: "Guest"
  },
  
  weather: {
    type: "weather",
    location: "New York",
    units: "metric"
  },
  
  search: {
    type: "search",
    query: "React tutorials",
    filters: {
      category: "programming",
      difficulty: "beginner"
    }
  },
  
  userInfo: {
    type: "user_info",
    name: "John Doe",
    email: "john@example.com",
    preferences: ["technology", "programming"]
  },
  
  dataQuery: {
    type: "data_query",
    table: "users",
    filters: {
      active: true,
      role: "admin"
    },
    limit: 10
  },
  
  notification: {
    type: "notification",
    message: "Task completed successfully",
    priority: "high",
    recipient: "user123"
  },
  
  fileOperation: {
    type: "file_operation",
    action: "upload",
    filename: "document.pdf",
    metadata: {
      size: "2.5MB",
      type: "application/pdf"
    }
  },
  
  apiCall: {
    type: "api_call",
    endpoint: "/api/v1/users",
    method: "GET",
    parameters: {
      page: 1,
      limit: 20
    }
  }
};

export const getTemplateByName = (name) => {
  return jsonTemplates[name] || null;
};

export const getAllTemplateNames = () => {
  return Object.keys(jsonTemplates);
};
