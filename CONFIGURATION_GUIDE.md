# Stitch n Pitch Contest - Configuration Guide

This document explains how to update the contest configuration, including guides, departments, and passwords.

## 📁 Configuration File Location

All configuration is managed in a single file:
```
src/config/data.ts
```

## 🎯 1. How to Update Guides and Departments

### Adding New Guides

To add new guides to the contest, edit the `GUIDES` array in `src/config/data.ts`:

```typescript
export const GUIDES: Guide[] = [
  // Existing guides...
  
  // Add new guide like this:
  {
    id: 171, // Use next available ID number
    name: "John Smith",
    department: "New Department", // Can be existing or new department
    supervisor: "Jane Doe"
  },
  
  // Add more guides as needed...
];
```

### Adding New Departments

Departments are automatically generated from the guides list. To add a new department:

1. Simply add guides with the new department name
2. The department will automatically appear in the department selector

Example:
```typescript
{
  id: 172,
  name: "Alice Johnson",
  department: "Research & Development", // New department
  supervisor: "Bob Wilson"
},
{
  id: 173,
  name: "Charlie Brown",
  department: "Research & Development", // Same new department
  supervisor: "Bob Wilson"
}
```

### Removing Guides or Departments

1. **To remove a guide**: Delete or comment out their entry from the `GUIDES` array
2. **To remove a department**: Remove all guides from that department

### Updating Existing Guide Information

Find the guide in the `GUIDES` array and update their information:

```typescript
{
  id: 1,
  name: "Sarah Johnson Updated", // Updated name
  department: "Digital Marketing", // Updated department
  supervisor: "New Supervisor Name" // Updated supervisor
}
```

### Important Notes for Guide Management

- **ID Numbers**: Each guide must have a unique `id` number
- **Department Names**: Must be exact matches (case-sensitive)
- **Required Fields**: All fields (`id`, `name`, `department`, `supervisor`) are required
- **No Database Changes**: Guide changes only require updating the source code, no database migration needed
- **Winner Exclusion**: Guides who have already won will be automatically excluded from future selections

## 🔐 2. How to Update Passwords

There are two passwords used in the system, both defined in `src/config/data.ts`:

### Admin Password (Pass/Fail Actions)

This password is required when marking a guide as Pass or Fail:

```typescript
// Password for marking guides as Pass/Fail
export const ADMIN_PASSWORD = "hgjikmnerDmAn@27Lz9";
```

**To update**: Change the string value to your desired password.

### Purge Password (Delete All Winners)

This password is required when purging all winners from the database:

```typescript
// Password for purging winners (can be same or different)
export const PURGE_PASSWORD = "hgjikmnerDmAn@27Lz9!";
```

**To update**: Change the string value to your desired password.

### Password Security Best Practices

1. **Use Strong Passwords**: Include uppercase, lowercase, numbers, and special characters
2. **Different Passwords**: Consider using different passwords for admin and purge actions
3. **Regular Updates**: Change passwords periodically for security
4. **Secure Storage**: Keep passwords confidential and only share with authorized personnel

## 🚀 3. Applying Changes

After making any configuration changes:

1. **Save the file**: `src/config/data.ts`
2. **Restart the development server**: The changes will be automatically applied
3. **No database migration needed**: Guide and password changes are immediate

## 🎮 4. New Features in Stitch n Pitch

### Enhanced Selection Process
- **Extended Animation**: Guide selection now takes 5-7 seconds to build suspense
- **Winner Exclusion**: Guides who have already won are automatically excluded from future selections
- **Department Status**: Shows available guides vs. already won guides per department

### Fail Animation
- **Funny Fail Animation**: When a guide is marked as "Fail", a humorous animation plays
- **Random Messages**: Different funny messages appear each time someone fails
- **4-Second Duration**: The fail animation lasts 4 seconds before returning to selection

### Visual Improvements
- **Prominent Logo**: The Stitch n Pitch logo is now more prominently displayed
- **Updated Branding**: All references changed from "Stitch and Pitch" to "Stitch n Pitch"
- **Better Feedback**: Clear indication of available vs. won guides in each department

## 📋 5. Configuration Examples

### Example: Adding a Complete New Department

```typescript
// Add these guides to create a "Quality Assurance" department
{
  id: 171,
  name: "Emma Wilson",
  department: "Quality Assurance",
  supervisor: "Michael Johnson"
},
{
  id: 172,
  name: "David Lee",
  department: "Quality Assurance",
  supervisor: "Michael Johnson"
},
{
  id: 173,
  name: "Sophie Chen",
  department: "Quality Assurance",
  supervisor: "Emma Wilson"
}
```

### Example: Updating Passwords for New Event

```typescript
// Update for 2025 contest
export const ADMIN_PASSWORD = "StitchNPitch2025!Admin";
export const PURGE_PASSWORD = "ClearWinners2025@Secure";
```

## ⚠️ 6. Important Warnings

### DO NOT:
- Change guide `id` numbers after winners have been selected (this will break winner history)
- Delete guides that have already won (unless you also purge the winner database)
- Use special characters that might break the application in names or departments

### DO:
- Test password changes immediately after updating
- Keep a backup of the configuration file before making major changes
- Verify all guide information is accurate before starting the contest
- Use the purge function to reset winners when starting a new contest period

## 🔧 7. Troubleshooting

### Common Issues:

1. **Department not showing**: Check that guide names and departments are spelled correctly
2. **Password not working**: Ensure no extra spaces or characters in password strings
3. **Guide not appearing**: Verify the guide object has all required fields and proper syntax
4. **"No guides available" message**: This means all guides in that department have already won

### Getting Help:

If you encounter issues:
1. Check the browser console for error messages
2. Verify the syntax in `src/config/data.ts` is correct
3. Restart the development server
4. Check that all required fields are present for each guide

## 📊 8. Current Configuration Summary

The system will automatically display:
- Total number of guides: `CONTEST_CONFIG.totalGuides`
- Total number of departments: `CONTEST_CONFIG.totalDepartments`
- Available guides per department (excluding winners)
- Winner count per department
- All departments are listed alphabetically in the department selector

This information updates automatically when you modify the `GUIDES` array.

## 🎯 9. Contest Flow

1. **Select Department**: Choose from available departments
2. **View Status**: See available vs. already won guides
3. **Random Selection**: 5-7 second suspenseful animation
4. **Mark Result**: Pass (becomes winner + confetti) or Fail (funny animation)
5. **Automatic Exclusion**: Winners are excluded from future selections
6. **History Tracking**: All winners are saved to database and displayed in Winners tab

---

**Last Updated**: January 2025  
**Version**: 2.0 - Stitch n Pitch Edition  
**Contact**: System Administrator