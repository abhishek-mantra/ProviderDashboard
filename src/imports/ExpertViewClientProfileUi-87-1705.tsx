import svgPaths from "./svg-hge4aei81j";

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
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#101828] text-[24px] whitespace-nowrap">{`Insurance & Claims - Rachit`}</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[333.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button />
        <H />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[818.75px] relative size-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[65px] items-start left-0 pb-px pt-[16px] px-[192px] top-0 w-[1536px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function Shield() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Shield">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Shield">
          <path d={svgPaths.p25fc4100} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function H1() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-h-px min-w-px relative" data-name="h2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[20px] whitespace-nowrap">{`Insurance & Claims`}</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[28px] relative shrink-0 w-[200.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Shield />
        <H1 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex h-[69px] items-center justify-between left-0 pb-px pl-[24px] pr-[879.703px] top-0 w-[1104px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container5 />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[38px] relative shrink-0 w-[111.344px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#3b82f6] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[56.5px] not-italic text-[#3b82f6] text-[16px] text-center top-[-2px] whitespace-nowrap">Insurance Info</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[38px] relative shrink-0 w-[55.719px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[28px] not-italic text-[#4a5565] text-[16px] text-center top-[-2px] whitespace-nowrap">Claims</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[32px] h-[38px] items-center relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39px] items-start left-0 pb-px px-[24px] top-[69px] w-[1104px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container7 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[0] min-h-px min-w-px not-italic relative text-[#fb2c36] text-[14px]">
        <span className="leading-[20px]">*</span>
        <span className="leading-[20px] text-[#101828]">{` Type`}</span>
      </p>
    </div>
  );
}

function Input() {
  return <div className="shrink-0 size-[16px]" data-name="input" />;
}

function Span() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Primary insurance</p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[138.156px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Input />
        <Span />
      </div>
    </div>
  );
}

function Input1() {
  return <div className="shrink-0 size-[16px]" data-name="input" />;
}

function Span1() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Secondary insurance</p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[155.344px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Input1 />
        <Span1 />
      </div>
    </div>
  );
}

function Input2() {
  return <div className="shrink-0 size-[16px]" data-name="input" />;
}

function Span2() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Other</p>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[60.422px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Input2 />
        <Span2 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[24px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Label2 />
      <Label3 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Container10 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[0] min-h-px min-w-px not-italic relative text-[#fb2c36] text-[14px]">
        <span className="leading-[20px]">*</span>
        <span className="leading-[20px] text-[#101828]">{` Primary policy holder`}</span>
      </p>
    </div>
  );
}

function Input3() {
  return <div className="shrink-0 size-[16px]" data-name="input" />;
}

function Span3() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Client</p>
      </div>
    </div>
  );
}

function Label5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[60.688px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Input3 />
        <Span3 />
      </div>
    </div>
  );
}

function Input4() {
  return <div className="shrink-0 size-[16px]" data-name="input" />;
}

function Span4() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">{`Client's spouse`}</p>
      </div>
    </div>
  );
}

function Label6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[118.094px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Input4 />
        <Span4 />
      </div>
    </div>
  );
}

function Input5() {
  return <div className="shrink-0 size-[16px]" data-name="input" />;
}

function Span5() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">{`Client's parent`}</p>
      </div>
    </div>
  );
}

function Label7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[114.922px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Input5 />
        <Span5 />
      </div>
    </div>
  );
}

function Input6() {
  return <div className="shrink-0 size-[16px]" data-name="input" />;
}

function Span6() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Other</p>
      </div>
    </div>
  );
}

function Label8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[60.422px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Input6 />
        <Span6 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[24px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Label5 />
      <Label6 />
      <Label7 />
      <Label8 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Label4 />
      <Container12 />
    </div>
  );
}

function Label9() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[0] min-h-px min-w-px not-italic relative text-[#fb2c36] text-[14px]">
        <span className="leading-[20px]">*</span>
        <span className="leading-[20px] text-[#101828]">{` Payer`}</span>
      </p>
    </div>
  );
}

function Option() {
  return <div className="absolute left-[-240px] size-0 top-[-399px]" data-name="option" />;
}

function Option1() {
  return <div className="absolute left-[-240px] size-0 top-[-399px]" data-name="option" />;
}

function Option2() {
  return <div className="absolute left-[-240px] size-0 top-[-399px]" data-name="option" />;
}

function Option3() {
  return <div className="absolute left-[-240px] size-0 top-[-399px]" data-name="option" />;
}

function Option4() {
  return <div className="absolute left-[-240px] size-0 top-[-399px]" data-name="option" />;
}

function Option5() {
  return <div className="absolute left-[-240px] size-0 top-[-399px]" data-name="option" />;
}

function Select() {
  return (
    <div className="bg-white h-[41px] relative rounded-[10px] shrink-0 w-full" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Option />
      <Option1 />
      <Option2 />
      <Option3 />
      <Option4 />
      <Option5 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[67px] items-start relative shrink-0 w-full" data-name="Container">
      <Label9 />
      <Select />
    </div>
  );
}

function Label10() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[0] min-h-px min-w-px not-italic relative text-[#fb2c36] text-[14px]">
        <span className="leading-[20px]">*</span>
        <span className="leading-[20px] text-[#101828]">{` Member ID`}</span>
      </p>
    </div>
  );
}

function Input7() {
  return (
    <div className="h-[42px] relative rounded-[10px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label10 />
      <Input7 />
    </div>
  );
}

function Label11() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#101828] text-[14px]">Plan ID</p>
    </div>
  );
}

function Input8() {
  return (
    <div className="h-[42px] relative rounded-[10px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label11 />
      <Input8 />
    </div>
  );
}

function Container14() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[68px] relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Label12() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#101828] text-[14px]">Group ID</p>
    </div>
  );
}

function Input9() {
  return (
    <div className="h-[42px] relative rounded-[10px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label12 />
      <Input9 />
    </div>
  );
}

function Label13() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#101828] text-[14px]">Copay/Coinsurance</p>
    </div>
  );
}

function Input10() {
  return (
    <div className="absolute h-[42px] left-0 rounded-[10px] top-0 w-[376px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip pl-[28px] pr-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] whitespace-nowrap">0</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Span7() {
  return (
    <div className="absolute h-[24px] left-[12px] top-[10px] w-[8.625px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#6a7282] text-[16px] top-[-2px] whitespace-nowrap">$</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Container">
      <Input10 />
      <Span7 />
    </div>
  );
}

function Container19() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label13 />
      <Container20 />
    </div>
  );
}

function Container17() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[68px] relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Label14() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#101828] text-[14px]">For superbills, send payment to</p>
    </div>
  );
}

function Option6() {
  return <div className="absolute left-[-240px] size-0 top-[-674px]" data-name="option" />;
}

function Option7() {
  return <div className="absolute left-[-240px] size-0 top-[-674px]" data-name="option" />;
}

function Select1() {
  return (
    <div className="bg-white h-[41px] relative rounded-[10px] shrink-0 w-full" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Option6 />
      <Option7 />
    </div>
  );
}

function Container22() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label14 />
      <Select1 />
    </div>
  );
}

function Label15() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#101828] text-[14px]">Deductible</p>
    </div>
  );
}

function Input11() {
  return (
    <div className="absolute h-[42px] left-0 rounded-[10px] top-0 w-[376px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip pl-[28px] pr-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] whitespace-nowrap">0</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Span8() {
  return (
    <div className="absolute h-[24px] left-[12px] top-[10px] w-[8.625px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#6a7282] text-[16px] top-[-2px] whitespace-nowrap">$</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Container">
      <Input11 />
      <Span8 />
    </div>
  );
}

function Container23() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label15 />
      <Container24 />
    </div>
  );
}

function Container21() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[68px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Label16() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#101828] text-[14px]">Effective start date</p>
    </div>
  );
}

function Option8() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option9() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option10() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option11() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option12() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option13() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option14() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option15() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option16() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option17() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option18() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option19() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option20() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select2() {
  return (
    <div className="bg-white flex-[1_0_0] h-[41px] min-h-px min-w-px relative rounded-[10px]" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pl-[-240px] pr-[360px] pt-[-766px] relative size-full">
        <Option8 />
        <Option9 />
        <Option10 />
        <Option11 />
        <Option12 />
        <Option13 />
        <Option14 />
        <Option15 />
        <Option16 />
        <Option17 />
        <Option18 />
        <Option19 />
        <Option20 />
      </div>
    </div>
  );
}

function Option21() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option22() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option23() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option24() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option25() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option26() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option27() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option28() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option29() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option30() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option31() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option32() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option33() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option34() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option35() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option36() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option37() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option38() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option39() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option40() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option41() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option42() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option43() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option44() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option45() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option46() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option47() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option48() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option49() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option50() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option51() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option52() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select3() {
  return (
    <div className="bg-white flex-[1_0_0] h-[41px] min-h-px min-w-px relative rounded-[10px]" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pl-[-368px] pr-[488px] pt-[-766px] relative size-full">
        <Option21 />
        <Option22 />
        <Option23 />
        <Option24 />
        <Option25 />
        <Option26 />
        <Option27 />
        <Option28 />
        <Option29 />
        <Option30 />
        <Option31 />
        <Option32 />
        <Option33 />
        <Option34 />
        <Option35 />
        <Option36 />
        <Option37 />
        <Option38 />
        <Option39 />
        <Option40 />
        <Option41 />
        <Option42 />
        <Option43 />
        <Option44 />
        <Option45 />
        <Option46 />
        <Option47 />
        <Option48 />
        <Option49 />
        <Option50 />
        <Option51 />
        <Option52 />
      </div>
    </div>
  );
}

function Option53() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option54() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option55() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option56() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option57() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option58() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option59() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option60() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option61() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option62() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option63() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select4() {
  return (
    <div className="bg-white flex-[1_0_0] h-[41px] min-h-px min-w-px relative rounded-[10px]" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pl-[-496px] pr-[616px] pt-[-766px] relative size-full">
        <Option53 />
        <Option54 />
        <Option55 />
        <Option56 />
        <Option57 />
        <Option58 />
        <Option59 />
        <Option60 />
        <Option61 />
        <Option62 />
        <Option63 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[8px] h-[41px] items-start relative shrink-0 w-full" data-name="Container">
      <Select2 />
      <Select3 />
      <Select4 />
    </div>
  );
}

function Container26() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label16 />
      <Container27 />
    </div>
  );
}

function Label17() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#101828] text-[14px]">Effective end date</p>
    </div>
  );
}

function Option64() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option65() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option66() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option67() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option68() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option69() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option70() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option71() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option72() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option73() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option74() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option75() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option76() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select5() {
  return (
    <div className="bg-white flex-[1_0_0] h-[41px] min-h-px min-w-px relative rounded-[10px]" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pl-[-632px] pr-[752px] pt-[-766px] relative size-full">
        <Option64 />
        <Option65 />
        <Option66 />
        <Option67 />
        <Option68 />
        <Option69 />
        <Option70 />
        <Option71 />
        <Option72 />
        <Option73 />
        <Option74 />
        <Option75 />
        <Option76 />
      </div>
    </div>
  );
}

function Option77() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option78() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option79() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option80() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option81() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option82() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option83() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option84() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option85() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option86() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option87() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option88() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option89() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option90() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option91() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option92() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option93() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option94() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option95() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option96() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option97() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option98() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option99() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option100() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option101() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option102() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option103() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option104() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option105() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option106() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option107() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option108() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select6() {
  return (
    <div className="bg-white flex-[1_0_0] h-[41px] min-h-px min-w-px relative rounded-[10px]" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pl-[-760px] pr-[880px] pt-[-766px] relative size-full">
        <Option77 />
        <Option78 />
        <Option79 />
        <Option80 />
        <Option81 />
        <Option82 />
        <Option83 />
        <Option84 />
        <Option85 />
        <Option86 />
        <Option87 />
        <Option88 />
        <Option89 />
        <Option90 />
        <Option91 />
        <Option92 />
        <Option93 />
        <Option94 />
        <Option95 />
        <Option96 />
        <Option97 />
        <Option98 />
        <Option99 />
        <Option100 />
        <Option101 />
        <Option102 />
        <Option103 />
        <Option104 />
        <Option105 />
        <Option106 />
        <Option107 />
        <Option108 />
      </div>
    </div>
  );
}

function Option109() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option110() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option111() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option112() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option113() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option114() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option115() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option116() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option117() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option118() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option119() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select7() {
  return (
    <div className="bg-white flex-[1_0_0] h-[41px] min-h-px min-w-px relative rounded-[10px]" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pl-[-888px] pr-[1008px] pt-[-766px] relative size-full">
        <Option109 />
        <Option110 />
        <Option111 />
        <Option112 />
        <Option113 />
        <Option114 />
        <Option115 />
        <Option116 />
        <Option117 />
        <Option118 />
        <Option119 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[8px] h-[41px] items-start relative shrink-0 w-full" data-name="Container">
      <Select5 />
      <Select6 />
      <Select7 />
    </div>
  );
}

function Container28() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label17 />
      <Container29 />
    </div>
  );
}

function Container25() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[67px] relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Container28 />
    </div>
  );
}

function Label18() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#101828] text-[14px]">Insurance payer phone</p>
    </div>
  );
}

function Input12() {
  return (
    <div className="h-[42px] relative rounded-[10px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container31() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label18 />
      <Input12 />
    </div>
  );
}

function Label19() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#101828] text-[14px]">Insurance payer fax</p>
    </div>
  );
}

function Input13() {
  return (
    <div className="h-[42px] relative rounded-[10px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container32() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[6px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label19 />
      <Input13 />
    </div>
  );
}

function Container30() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[68px] relative shrink-0 w-full" data-name="Container">
      <Container31 />
      <Container32 />
    </div>
  );
}

function Label20() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#101828] text-[14px]">Employer/School</p>
    </div>
  );
}

function Input14() {
  return (
    <div className="h-[42px] relative rounded-[10px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[68px] items-start relative shrink-0 w-full" data-name="Container">
      <Label20 />
      <Input14 />
    </div>
  );
}

function Label21() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#101828] text-[14px]">Insurance card</p>
    </div>
  );
}

function P() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px] text-center">Front of insurance card</p>
    </div>
  );
}

function Upload() {
  return (
    <div className="absolute left-[326px] size-[48px] top-0" data-name="Upload">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Upload">
          <path d={svgPaths.p38375ec0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M34 16L24 6L14 16" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M24 6V30" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function P1() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[222.66px] top-[60px] w-[254.688px]" data-name="p">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">Drag a photo of your insurance card here</p>
    </div>
  );
}

function Label22() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-start left-[16.92px] top-px w-[52.484px]" data-name="label">
      <p className="decoration-solid font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#155dfc] text-[16px] underline whitespace-nowrap">browse</p>
    </div>
  );
}

function P2() {
  return (
    <div className="absolute h-[24px] left-[256.14px] top-[84px] w-[187.719px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[2px] whitespace-nowrap">{`or `}</p>
      <Label22 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[69.41px] not-italic text-[#4a5565] text-[14px] top-[2px] whitespace-nowrap">{` for a file to upload`}</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[108px] relative shrink-0 w-full" data-name="Container">
      <Upload />
      <P1 />
      <P2 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[212px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[2px] pt-[34px] px-[34px] relative size-full">
        <P />
        <Container36 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[238px] items-start relative shrink-0 w-full" data-name="Container">
      <Label21 />
      <Container35 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[1024px] items-start left-[24px] top-[132px] w-[768px]" data-name="Container">
      <Container9 />
      <Container11 />
      <Container13 />
      <Container14 />
      <Container17 />
      <Container21 />
      <Container25 />
      <Container30 />
      <Container33 />
      <Container34 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-white h-[1180px] left-[216px] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[97px] w-[1104px]" data-name="Container">
      <Container4 />
      <Container6 />
      <Container8 />
    </div>
  );
}

function Div() {
  return (
    <div className="bg-[#f5f5f7] h-[1309px] relative shrink-0 w-full" data-name="div">
      <Container />
      <Container3 />
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[862px] items-start left-0 top-0 w-[1536px]" data-name="Body">
      <Div />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#3b82f6] h-[40px] left-[1422.44px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[80px] w-[81.563px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[41px] not-italic text-[16px] text-center text-white top-[6px] whitespace-nowrap">Save</p>
    </div>
  );
}

export default function ExpertViewClientProfileUi() {
  return (
    <div className="bg-white relative size-full" data-name="Expert View Client Profile UI">
      <Body />
      <Button3 />
    </div>
  );
}