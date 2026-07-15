import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.css'
})
export class WhyChooseUs {

  features = [
    {
      icon: 'fa-solid fa-microchip',
      title: 'RFID Solutions',
      description: 'Advanced RFID tracking and identification systems for smart business operations.'
    },
    {
      icon: 'fa-solid fa-code',
      title: 'Software Development',
      description: 'Custom web, mobile and enterprise applications built for performance.'
    },
    {
      icon: 'fa-solid fa-gears',
      title: 'Automation Systems',
      description: 'Smart automation solutions that improve efficiency and productivity.'
    },
    {
      icon: 'fa-solid fa-network-wired',
      title: 'Network Infrastructure',
      description: 'Reliable and secure networking solutions for modern organizations.'
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Cyber Security',
      description: 'Protect your business with enterprise-grade security and monitoring.'
    },
    {
      icon: 'fa-solid fa-chart-line',
      title: 'Digital Transformation',
      description: 'Technology strategies that accelerate business growth and innovation.'
    }
  ];

}