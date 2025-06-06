# Membership Features User Guide

## Introduction
This guide provides detailed instructions on how to use the membership features in the Aaden Desktop application. These features allow you to manage member information, track member orders, and provide personalized service to your members.

## Table of Contents
1. [Accessing Member Features](#accessing-member-features)
2. [Selecting a Member](#selecting-a-member)
3. [Viewing Member Details](#viewing-member-details)
4. [Managing Member Points](#managing-member-points)
5. [Claiming Awards](#claiming-awards)
6. [Viewing Member Orders](#viewing-member-orders)
7. [NFC Card Integration](#nfc-card-integration)
8. [Troubleshooting](#troubleshooting)

## Accessing Member Features
The member features are accessible from the table page. To access them:
1. Open the Aaden Desktop application
2. Navigate to a table page
3. Look for the member selection button in the header area

## Selecting a Member
There are two ways to select a member:
1. **Via UI**:
   - Click the member selection button in the header
   - A dialog will appear showing a list of members
   - You can search for a member by name, ID, or other information
   - Click on a member to select them

2. **Via NFC Scanning**:
   - If you have an NFC reader connected to your device
   - Scan the member's NFC card
   - The system will automatically detect the format "aaden:member:shortCode"
   - The member will be selected automatically

Once a member is selected, their information will be associated with the current order, and their name will be displayed in the header area.

## Viewing Member Details
After selecting a member, you can view their details:
1. Click on the member's name in the header
2. A dialog will appear showing the member's details, including:
   - Name
   - ID
   - Balance
   - Points
   - Available awards
   - Order history

## Managing Member Points
You can manage a member's points:
1. Open the member details dialog
2. Click the "Add Points" button
3. Enter the number of points to add
4. Click "Confirm"

The member's points will be updated, and the new balance will be displayed.

## Claiming Awards
If a member has earned awards, you can claim them:
1. Open the member details dialog
2. Click the "Claim Awards" button
3. A list of available awards will be displayed
4. Click on an award to claim it
5. The award will be marked as claimed, and any associated benefits will be applied

## Viewing Member Orders
You can view a member's order history:
1. Open the member details dialog
2. Scroll down to the "Recent Orders" section
3. A list of the member's recent orders will be displayed
4. You can see details such as order number, date, total, and status

## NFC Card Integration
The system supports NFC card integration for quick member selection:
1. Connect an NFC reader to your device
2. When a member presents their NFC card, scan it
3. The system will automatically detect the format "aaden:member:shortCode"
4. The member will be selected automatically

## Troubleshooting
If you encounter issues with the membership features, try the following:
1. **Member not found**: Ensure the member is registered in the system and the shortCode is correct
2. **NFC card not detected**: Check that your NFC reader is properly connected and configured
3. **Cannot add points**: Ensure you have the necessary permissions to modify member points
4. **Cannot claim awards**: Ensure the member has earned the award and it hasn't already been claimed
5. **Member details not loading**: Check your internet connection and ensure the cloud API is accessible

If problems persist, contact your system administrator or support team.
