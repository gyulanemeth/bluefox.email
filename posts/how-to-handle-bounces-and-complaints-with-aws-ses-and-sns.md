---
title: How to Handle Bounces and Complaints with AWS SES and SNS
description: yes.
category: tutorials
published: false
---

# How to Handle Bounces and Complaints with AWS SES and SNS

Általános leírás, hogy miért is kell kezelni...
 - belinkelni később, hogy az aws support meggyőzésében segít (production access)

Belinkelni a set up articlet.

Le kell majd írni a multi-identity-s setupot is... pl xyz.example.comról és simán az example.com-ról is küldhet


## Implement your Webhooks


## Create a topic

Volt datacenter, ahol voltak különbségek az öröklődésben... (application/json...) pedig ugyanazok voltak a beállítások... ezért én szeretem explicit mindehol beállítani...


## Create a subscription

mention ngrok!

confirm subscription... //separate message

vagy használj bluefoxot, az majd kiírja neked a cuccot amit be kell copyzni

## Set up notification at your SES Identity

// bounces / complaints...

## Test the webhook

// ide megy a végső screenshot, és le kell írni, hogy itt mit tudnak csinálni...
// - internal suppression list
// - remove from subscriber list

// Megemlíteni, hogy simán lehet küldeni a bounce@simulator.amazonses.com" email címre is... és akkor a wehbooknak meg kell hívódnia...





