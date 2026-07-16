import svgPaths from "./svg-6j41mvpp63";

function ChevronLeft() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="ChevronLeft">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
            <path d="M7 13L1 7L7 1" id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronLeft />
      </div>
    </div>
  );
}

function H() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="h1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#101828] text-[24px] whitespace-nowrap">Prescriptions – Rachit</p>
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="h-[24px] relative shrink-0 w-[6.5px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-2px] whitespace-nowrap">•</p>
      </div>
    </div>
  );
}

function Option() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option1() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option2() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select() {
  return (
    <div className="h-[23px] relative shrink-0 w-[91px]" data-name="select">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[-491.688px] pr-[582.688px] pt-[-24.5px] relative size-full">
        <Option />
        <Option1 />
        <Option2 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <H />
        <Span />
        <Select />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[390.688px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button />
        <Container3 />
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[73.906px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">Client Type:</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#3b82f6] h-[32px] relative rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-[118.5px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[16px] py-[6px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Mantra Client</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[33554400px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[16px] py-[6px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Personal Client</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[33554400px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[4px] px-[4px] relative size-full">
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[40px] relative shrink-0 w-[334.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span1 />
        <Container5 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container4 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[73px] items-start left-0 pb-px pt-[16px] px-[192px] top-0 w-[1536px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function User() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="User">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="User">
          <path d={svgPaths.p67f12c8} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2c19cb00} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[33554400px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <User />
      </div>
    </div>
  );
}

function P() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2px] whitespace-nowrap">Rachit Sharma</p>
    </div>
  );
}

function P1() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[14px]">#168019</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <P />
        <P1 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[48px] relative shrink-0 w-[164.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Option3() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option4() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option5() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select1() {
  return (
    <div className="h-[39px] relative rounded-[10px] shrink-0 w-[94px]" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pl-[-1210px] pr-[1304px] pt-[-117.5px] relative size-full">
        <Option3 />
        <Option4 />
        <Option5 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-white content-stretch flex h-[80px] items-center justify-between left-[216px] px-[16px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[97px] w-[1104px]" data-name="Container">
      <Container7 />
      <Select1 />
    </div>
  );
}

function FileText() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="FileText">
          <path d={svgPaths.p3713e00} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pd2076c0} id="Vector_2" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 7.5H6.66667" id="Vector_3" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 10.8333H6.66667" id="Vector_4" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 14.1667H6.66667" id="Vector_5" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function H1() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-h-px min-w-px relative" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[20px] whitespace-nowrap">Prescription #247</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[28px] relative shrink-0 w-[187px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <FileText />
        <H1 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#3b82f6] h-[44px] relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-[170.219px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[85px] not-italic text-[16px] text-center text-white top-[8px] whitespace-nowrap">Email Prescription</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[44px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Button3 />
    </div>
  );
}

function P2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[14px]">Date</p>
    </div>
  );
}

function P3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2px] whitespace-nowrap">Feb 8, 2026</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <P2 />
      <P3 />
    </div>
  );
}

function P4() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Chief Complaints</p>
    </div>
  );
}

function Span2() {
  return (
    <div className="absolute bg-[#dbeafe] content-stretch flex h-[28px] items-start left-0 px-[12px] py-[4px] rounded-[33554400px] top-0 w-[126.109px]" data-name="span">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1447e6] text-[14px] whitespace-nowrap">Persistent cough</p>
    </div>
  );
}

function Span3() {
  return (
    <div className="absolute bg-[#dbeafe] content-stretch flex h-[28px] items-start left-[134.11px] px-[12px] py-[4px] rounded-[33554400px] top-0 w-[130.797px]" data-name="span">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1447e6] text-[14px] whitespace-nowrap">Chest congestion</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <Span2 />
      <Span3 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <P4 />
      <Container16 />
    </div>
  );
}

function P5() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Medical History</p>
    </div>
  );
}

function Span4() {
  return (
    <div className="absolute bg-[#f3e8ff] content-stretch flex h-[28px] items-start left-0 px-[12px] py-[4px] rounded-[33554400px] top-0 w-[160.016px]" data-name="span">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#8200db] text-[14px] whitespace-nowrap">No chronic conditions</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <Span4 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <P5 />
      <Container18 />
    </div>
  );
}

function P6() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Provisional Diagnosis</p>
    </div>
  );
}

function P7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#0d542b] text-[16px] top-[-2px] whitespace-nowrap">Acute Bronchitis</p>
    </div>
  );
}

function P8() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#008236] text-[14px]">Upper respiratory infection</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[#f0fdf4] h-[72px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start pt-[12px] px-[12px] relative size-full">
        <P7 />
        <P8 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[100px] items-start relative shrink-0 w-full" data-name="Container">
      <P6 />
      <Container20 />
    </div>
  );
}

function P9() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Diagnostic Tests</p>
    </div>
  );
}

function P10() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#733e0a] text-[16px] top-[-2px] whitespace-nowrap">Chest X-Ray</p>
    </div>
  );
}

function P11() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#a65f00] text-[14px]">To rule out pneumonia</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-[#fefce8] h-[72px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start pt-[12px] px-[12px] relative size-full">
        <P10 />
        <P11 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[100px] items-start relative shrink-0 w-full" data-name="Container">
      <P9 />
      <Container22 />
    </div>
  );
}

function P12() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Medicines</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[#101828] text-[0px] top-[-2px] whitespace-nowrap">
        <span className="leading-[24px] text-[16px]">Crocin</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#4a5565] text-[14px]">(Acetaminophen)</span>
      </p>
    </div>
  );
}

function P13() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">• 500mg - Morning (After food)</p>
    </div>
  );
}

function P14() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[14px]">Duration: 3 Days</p>
    </div>
  );
}

function P15() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Italic',sans-serif] font-normal italic leading-[20px] min-h-px min-w-px relative text-[#4a5565] text-[14px]">Take with plenty of water</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[#f9fafb] h-[142px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container25 />
        <P13 />
        <P14 />
        <P15 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[170px] items-start relative shrink-0 w-full" data-name="Container">
      <P12 />
      <Container24 />
    </div>
  );
}

function P16() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Signature</p>
    </div>
  );
}

function P17() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[14px]">✓ Digitally signed</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[#f9fafb] h-[46px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[13px] px-[13px] relative size-full">
        <P17 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[74px] items-start relative shrink-0 w-full" data-name="Container">
      <P16 />
      <Container27 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[748px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
      <Container17 />
      <Container19 />
      <Container21 />
      <Container23 />
      <Container26 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[24px] h-[864px] items-start left-[216px] pt-[24px] px-[24px] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[193px] w-[1104px]" data-name="Container">
      <Container11 />
      <Container13 />
    </div>
  );
}

function Div() {
  return (
    <div className="bg-[#f5f5f7] h-[1073px] relative shrink-0 w-full" data-name="div">
      <Container />
      <Container6 />
      <Container10 />
    </div>
  );
}

export default function ExpertViewClientProfileUi() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Expert View Client Profile UI">
      <Div />
    </div>
  );
}