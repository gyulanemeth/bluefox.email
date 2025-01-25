---
layout: post
title: How to Handle Bounces and Complaints with AWS SES and SNS
description: yes.
category: tutorials
sidebar: false
published: true
---

# How to Handle Bounces and Complaints with AWS SES and SNS

Általános leírás, hogy miért is kell kezelni...
 - belinkelni később, hogy az aws support meggyőzésében segít (production access)

Belinkelni a set up articlet.

Le kell majd írni a multi-identity-s setupot is... pl xyz.example.comról és simán az example.com-ról is küldhet

// talán egy nulladik kép a dashboardról?

## How it works - in a nutshell

SES bounce / complaint event -> topics -> subscription -> webhook

## Implement your Webhooks


## Create a topic

Volt datacenter, ahol voltak különbségek az öröklődésben... (application/json...) pedig ugyanazok voltak a beállítások... ezért én szeretem explicit mindehol beállítani...

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/01.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/02.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/03.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/04.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/05.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/06.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/07.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/08.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/09.png)


## Create a subscription

mention ngrok!

confirm subscription... //separate message

vagy használj bluefoxot, az majd kiírja neked a cuccot amit be kell copyzni

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/10.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/11.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/12.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/13.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/14.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/15.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/16.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/17.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/18.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/18a.png)

OR

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/18b1.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/18b2.png)

either way:
![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/19.png)


## Set up notification at your SES Identity

// bounces / complaints...

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/20.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/21.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/22.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/23.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/24.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/25.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/26.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/27.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/28.png)


## Test the webhook

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/29.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/30.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/31.png)

![](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns/32.png)


// ide megy a végső screenshot, és le kell írni, hogy itt mit tudnak csinálni...
// - internal suppression list
// - remove from subscriber list

// Megemlíteni, hogy simán lehet küldeni a bounce@simulator.amazonses.com" email címre is... és akkor a wehbooknak meg kell hívódnia...





