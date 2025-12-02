# 🧪 Quick Test Guide - Movie Management

## 🚀 **How to Test**

### **Step 1: Access Admin Panel**
1. Make sure server is running: `npm run dev`
2. Open browser: `http://localhost:5173`
3. Login with admin credentials
4. Click "Admin Panel" in navigation

### **Step 2: Navigate to Movies**
1. In admin sidebar, click "Movies"
2. You should see the Movie Management interface

### **Step 3: Test Add Movie**
1. Click "+ Add Movie" button
2. Fill in test data:
   ```
   Title: Test Movie
   Description: This is a test movie description
   Genre: Action
   Duration: 120
   Rating: 8.5
   Release Date: 2024-12-01
   Poster URL: https://via.placeholder.com/300x450
   ```
3. Click "Create Movie"
4. Check if movie appears in grid
5. Check for success toast notification

### **Step 4: Test Edit Movie**
1. Hover over the test movie card
2. Click the Edit (✏️) button
3. Change the title to "Updated Test Movie"
4. Click "Update Movie"
5. Verify changes appear
6. Check for success toast

### **Step 5: Test Delete Movie**
1. Hover over the test movie card
2. Click Delete (🗑️) button
3. Confirm deletion in popup
4. Verify movie is removed
5. Check for success toast

### **Step 6: Test Validation**
1. Click "+ Add Movie"
2. Try to submit with empty fields
3. Verify validation messages appear
4. Try rating > 10 or < 0
5. Verify validation works

### **Step 7: Test Empty State**
1. Delete all movies (if any)
2. Verify empty state displays with message
3. Check "Add Movie" button in empty state works

---

## ✅ **Expected Results**

- ✅ Movies load in responsive grid
- ✅ Hover effects work on cards
- ✅ Modal opens/closes smoothly
- ✅ Form validation prevents invalid data
- ✅ CRUD operations work correctly
- ✅ Toast notifications appear
- ✅ Loading states display
- ✅ No console errors

---

## 🐛 **Troubleshooting**

### **Problem: Movies don't load**
- Check if backend is running
- Check browser console for errors
- Verify you're logged in as admin

### **Problem: Can't create/edit movies**
- Verify admin role in database
- Check JWT token is valid
- Check backend /api/movies routes are protected

### **Problem: Form doesn't submit**
- Check validation errors
- Check all required fields are filled
- Check browser console for errors

---

## 📸 **What to Look For**

1. **Grid Layout**: 1-4 columns based on screen size
2. **Glassmorphism**: Cards have glass effect
3. **Hover Effects**: Scale and buttons appear
4. **Modal**: Smooth animation, blur backdrop
5. **Form**: Clean input fields with validation
6. **Empty State**: Helpful message when no movies

---

**Happy Testing!** 🎬
