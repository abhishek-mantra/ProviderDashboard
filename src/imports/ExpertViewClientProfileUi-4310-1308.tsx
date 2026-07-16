function Icon() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
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
    <div className="relative shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#101828] text-[24px] whitespace-nowrap">CMS-1500 Health Insurance Claim Form</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[466.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button />
        <Heading />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[813.781px] relative size-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[65px] items-start left-0 pb-px pt-[16px] px-[128px] top-0 w-[1536px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[322.672px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">CMS-1500 Health Insurance Claim Form</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="bg-[#364153] h-[24px] relative rounded-[4px] shrink-0 w-[81.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[10px] py-[4px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">APPROVED</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-[#dbeafe] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-[4px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[10px] py-[4px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">Claim Details ▼</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[193.609px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text />
        <Text1 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container6 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white h-[92px] relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[24px] px-[24px] relative size-full">
        <Container5 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[13.328px] left-[8px] top-[8px] w-[560px]" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[#0a0a0a] text-[10px] top-[-1px] whitespace-nowrap">PAYER ID</p>
    </div>
  );
}

function TextInput() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-[8px] top-[25.33px] w-[560px]" data-name="Text Input" />;
}

function Container12() {
  return (
    <div className="absolute h-[13.328px] left-[8px] top-[54.33px] w-[560px]" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[#0a0a0a] text-[10px] top-[-1px] whitespace-nowrap">Carrier</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Name</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput2() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Address line 1</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Address line 2</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[67px] items-start left-[8px] top-[71.66px] w-[560px]" data-name="Container">
      <TextInput1 />
      <TextInput2 />
      <TextInput3 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[171px] left-0 top-0 w-[578px]" data-name="Container">
      <Container11 />
      <TextInput />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[249px]">1. MEDICARE MEDICAID TRICARE CHAMPVA GROUP HEALTH PLAN FECA BLK LUNG OTHER</p>
    </div>
  );
}

function Checkbox() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Checkbox" />;
}

function Label() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[81.266px]" data-name="Label">
      <Checkbox />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` Medicare`}</p>
    </div>
  );
}

function Checkbox1() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Checkbox" />;
}

function Label1() {
  return (
    <div className="absolute h-[24px] left-[85.27px] top-0 w-[80.813px]" data-name="Label">
      <Checkbox1 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` Medicaid`}</p>
    </div>
  );
}

function Checkbox2() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Checkbox" />;
}

function Label2() {
  return (
    <div className="absolute h-[24px] left-[170.08px] top-0 w-[76.375px]" data-name="Label">
      <Checkbox2 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` TRICARE`}</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Label />
      <Label1 />
      <Label2 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[66px] items-start left-0 pb-px pt-[7px] px-[7px] top-0 w-[285px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`1a. INSURED'S I.D. NUMBER`}</p>
    </div>
  );
}

function TextInput4() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[66px] items-start left-[293px] pb-px pt-[7px] px-[7px] top-0 w-[285px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container20 />
      <TextInput4 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[66px] relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container19 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[6px] w-[173.328px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`2. PATIENT'S NAME`}</p>
    </div>
  );
}

function TextInput5() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[22px] w-[173.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">John</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput6() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[45px] w-[173.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">First name</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput7() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[68px] w-[173.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Middle name</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[97px] left-0 top-0 w-[187.328px]" data-name="Container">
      <Container23 />
      <TextInput5 />
      <TextInput6 />
      <TextInput7 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[6px] w-[173.328px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`3. PATIENT'S BIRTH DATE`}</p>
    </div>
  );
}

function TextInput8() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.109px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput9() {
  return (
    <div className="absolute h-[22px] left-[59.11px] top-0 w-[55.109px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput10() {
  return (
    <div className="absolute h-[22px] left-[118.22px] top-0 w-[55.109px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[22px] left-[6px] top-[22px] w-[173.328px]" data-name="Container">
      <TextInput8 />
      <TextInput9 />
      <TextInput10 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[48px] w-[173.328px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">SEX</p>
    </div>
  );
}

function RadioButton() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[28.797px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` M`}</p>
      </div>
    </div>
  );
}

function RadioButton1() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[22.047px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton1 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` F`}</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-start left-[6px] top-[60px] w-[173.328px]" data-name="Container">
      <Label3 />
      <Label4 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[97px] left-[195.33px] top-0 w-[187.328px]" data-name="Container">
      <Container25 />
      <Container26 />
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[6px] w-[173.328px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`4. INSURED'S NAME`}</p>
    </div>
  );
}

function TextInput11() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[22px] w-[173.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Last name</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput12() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[45px] w-[173.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">First name</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput13() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[68px] w-[173.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Middle</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[97px] left-[390.66px] top-0 w-[187.328px]" data-name="Container">
      <Container30 />
      <TextInput11 />
      <TextInput12 />
      <TextInput13 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[97px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container24 />
      <Container29 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[171px] items-start left-[590px] top-0 w-[578px]" data-name="Container">
      <Container15 />
      <Container21 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[171px] relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container14 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[6px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`5. PATIENT'S ADDRESS`}</p>
    </div>
  );
}

function TextInput14() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[22px] w-[272px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Street</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput15() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[45px] w-[272px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">City</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput16() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[134px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">State</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput17() {
  return (
    <div className="absolute h-[21px] left-[138px] top-0 w-[134px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">ZIP</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[68px] w-[272px]" data-name="Container">
      <TextInput16 />
      <TextInput17 />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[93px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">TELEPHONE</p>
    </div>
  );
}

function TextInput18() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-[6px] top-[105px] w-[272px]" data-name="Text Input" />;
}

function Container32() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[134px] left-0 top-0 w-[286px]" data-name="Container">
      <Container33 />
      <TextInput14 />
      <TextInput15 />
      <Container34 />
      <Container35 />
      <TextInput18 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">6. PATIENT RELATIONSHIP TO INSURED</p>
    </div>
  );
}

function RadioButton2() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <RadioButton2 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[16px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` Self`}</p>
    </div>
  );
}

function RadioButton3() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <RadioButton3 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[16px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` Spouse`}</p>
    </div>
  );
}

function RadioButton4() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <RadioButton4 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[16px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` Child`}</p>
    </div>
  );
}

function RadioButton5() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <RadioButton5 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[16px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` Other`}</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[102px] items-start relative shrink-0 w-full" data-name="Container">
      <Label5 />
      <Label6 />
      <Label7 />
      <Label8 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[134px] items-start left-[294px] pb-px pt-[7px] px-[7px] top-0 w-[286px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[6px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`7. INSURED'S ADDRESS`}</p>
    </div>
  );
}

function TextInput19() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[22px] w-[272px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Street</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput20() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[45px] w-[272px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">City</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput21() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[134px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">State</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput22() {
  return (
    <div className="absolute h-[21px] left-[138px] top-0 w-[134px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">ZIP</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[68px] w-[272px]" data-name="Container">
      <TextInput21 />
      <TextInput22 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[93px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">TELEPHONE</p>
    </div>
  );
}

function TextInput23() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-[6px] top-[105px] w-[272px]" data-name="Text Input" />;
}

function Container39() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[134px] left-[588px] top-0 w-[286px]" data-name="Container">
      <Container40 />
      <TextInput19 />
      <TextInput20 />
      <Container41 />
      <Container42 />
      <TextInput23 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">8. RESERVED FOR NUCC USE</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex flex-col h-[134px] items-start left-[882px] pb-px pt-[7px] px-[7px] top-0 w-[286px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container44 />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[134px] relative shrink-0 w-full" data-name="Container">
      <Container32 />
      <Container36 />
      <Container39 />
      <Container43 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`9. OTHER INSURED'S NAME`}</p>
    </div>
  );
}

function TextInput24() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`a. OTHER INSURED'S POLICY OR GROUP NUMBER`}</p>
    </div>
  );
}

function TextInput25() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">b. RESERVED FOR NUCC USE</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">c. RESERVED FOR NUCC USE</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">d. INSURANCE PLAN NAME OR PROGRAM NAME</p>
    </div>
  );
}

function TextInput26() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[265.656px] items-start left-0 pb-px pt-[7px] px-[7px] top-0 w-[286px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container47 />
      <TextInput24 />
      <Container48 />
      <TextInput25 />
      <Container49 />
      <Container50 />
      <Container51 />
      <TextInput26 />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`10. IS PATIENT'S CONDITION RELATED TO:`}</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">a. EMPLOYMENT? (Current or Previous)</p>
    </div>
  );
}

function RadioButton6() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label9() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40.234px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton6 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` YES`}</p>
      </div>
    </div>
  );
}

function RadioButton7() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label10() {
  return (
    <div className="h-[24px] relative shrink-0 w-[38.375px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton7 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` NO`}</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <Label9 />
      <Label10 />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[38px] items-start relative shrink-0 w-full" data-name="Container">
      <Container56 />
      <Container57 />
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-0 top-0 w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">b. AUTO ACCIDENT?</p>
    </div>
  );
}

function RadioButton8() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40.234px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton8 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` YES`}</p>
      </div>
    </div>
  );
}

function RadioButton9() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label12() {
  return (
    <div className="h-[24px] relative shrink-0 w-[38.375px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton9 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` NO`}</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-start left-0 top-[14px] w-[272px]" data-name="Container">
      <Label11 />
      <Label12 />
    </div>
  );
}

function TextInput27() {
  return (
    <div className="absolute h-[21px] left-[8px] top-[38px] w-[64px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">State</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[59px] relative shrink-0 w-full" data-name="Container">
      <Container59 />
      <Container60 />
      <TextInput27 />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">c. OTHER ACCIDENT?</p>
    </div>
  );
}

function RadioButton10() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label13() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40.234px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton10 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` YES`}</p>
      </div>
    </div>
  );
}

function RadioButton11() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[38.375px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton11 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` NO`}</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <Label13 />
      <Label14 />
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[38px] items-start relative shrink-0 w-full" data-name="Container">
      <Container62 />
      <Container63 />
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">d. CLAIM CODES (Designated by NUCC)</p>
    </div>
  );
}

function TextInput28() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[35px] items-start relative shrink-0 w-full" data-name="Container">
      <Container65 />
      <TextInput28 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[182px] items-start relative shrink-0 w-full" data-name="Container">
      <Container55 />
      <Container58 />
      <Container61 />
      <Container64 />
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[265.656px] items-start left-[294px] pb-px pt-[7px] px-[7px] top-0 w-[286px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container53 />
      <Container54 />
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[6px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`11. INSURED'S POLICY GROUP OR FECA NUMBER`}</p>
    </div>
  );
}

function TextInput29() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-[6px] top-[22px] w-[272px]" data-name="Text Input" />;
}

function Container68() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[51px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`a. INSURED'S DATE OF BIRTH / SEX`}</p>
    </div>
  );
}

function TextInput30() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[88px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput31() {
  return (
    <div className="absolute h-[22px] left-[92px] top-0 w-[88px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput32() {
  return (
    <div className="absolute h-[22px] left-[184px] top-0 w-[88px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute h-[22px] left-[6px] top-[67px] w-[272px]" data-name="Container">
      <TextInput30 />
      <TextInput31 />
      <TextInput32 />
    </div>
  );
}

function RadioButton12() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label15() {
  return (
    <div className="h-[24px] relative shrink-0 w-[28.797px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton12 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` M`}</p>
      </div>
    </div>
  );
}

function RadioButton13() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label16() {
  return (
    <div className="h-[24px] relative shrink-0 w-[22.047px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton13 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` F`}</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-start left-[6px] top-[93px] w-[272px]" data-name="Container">
      <Label15 />
      <Label16 />
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[121px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">b. OTHER CLAIM ID (Designated by NUCC)</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[137px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">c. INSURANCE PLAN NAME OR PROGRAM NAME</p>
    </div>
  );
}

function TextInput33() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-[6px] top-[153px] w-[272px]" data-name="Text Input" />;
}

function Container73() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[178px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">d. IS THERE ANOTHER HEALTH BENEFIT PLAN?</p>
    </div>
  );
}

function RadioButton14() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label17() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40.234px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton14 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` YES`}</p>
      </div>
    </div>
  );
}

function RadioButton15() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label18() {
  return (
    <div className="h-[24px] relative shrink-0 w-[38.375px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton15 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` NO`}</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-start left-[6px] top-[194px] w-[272px]" data-name="Container">
      <Label17 />
      <Label18 />
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[265.656px] left-[588px] top-0 w-[286px]" data-name="Container">
      <Container67 />
      <TextInput29 />
      <Container68 />
      <Container69 />
      <Container70 />
      <Container71 />
      <Container72 />
      <TextInput33 />
      <Container73 />
      <Container74 />
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute h-[10.656px] left-[6px] top-[6px] w-[272px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">{`READ BACK OF FORM BEFORE COMPLETING & SIGNING THIS FORM`}</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[20.66px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`12. PATIENT'S OR AUTHORIZED PERSON'S SIGNATURE`}</p>
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute h-[48px] left-[6px] top-[36.66px] w-[272px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[259px]">I authorize the release of any medical or other information necessary to process this claim. I also request payment of government benefits either to myself or to the party who accepts assignment below.</p>
    </div>
  );
}

function Container80() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-0 top-[4px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">SIGNED</p>
    </div>
  );
}

function TextInput34() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-0 top-[16px] w-[272px]" data-name="Text Input" />;
}

function Container81() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-0 top-[41px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">DATE</p>
    </div>
  );
}

function TextInput35() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-0 top-[53px] w-[272px]" data-name="Text Input" />;
}

function Container79() {
  return (
    <div className="absolute border-[#d1d5dc] border-solid border-t h-[75px] left-[6px] top-[92.66px] w-[272px]" data-name="Container">
      <Container80 />
      <TextInput34 />
      <Container81 />
      <TextInput35 />
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[175.66px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`13. INSURED'S OR AUTHORIZED PERSON'S SIGNATURE`}</p>
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute h-[24px] left-[6px] top-[191.66px] w-[272px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[236px]">I authorize payment of medical benefits to the undersigned physician or supplier for services described below.</p>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">SIGNED</p>
    </div>
  );
}

function TextInput36() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute content-stretch flex flex-col h-[38px] items-start left-[6px] pt-[5px] top-[219.66px] w-[272px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-solid border-t inset-0 pointer-events-none" />
      <Container85 />
      <TextInput36 />
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[265.656px] left-[882px] top-0 w-[286px]" data-name="Container">
      <Container76 />
      <Container77 />
      <Container78 />
      <Container79 />
      <Container82 />
      <Container83 />
      <Container84 />
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[265.656px] relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Container52 />
      <Container66 />
      <Container75 />
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute h-[24px] left-[6px] top-[6px] w-[174px]" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[174px]">14. DATE OF CURRENT ILLNESS, INJURY, or PREGNANCY (LMP)</p>
    </div>
  );
}

function TextInput37() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput38() {
  return (
    <div className="absolute h-[22px] left-[59.33px] top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput39() {
  return (
    <div className="absolute h-[22px] left-[118.66px] top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute h-[22px] left-[6px] top-[34px] w-[174px]" data-name="Container">
      <TextInput37 />
      <TextInput38 />
      <TextInput39 />
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[60px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">QUAL:</p>
    </div>
  );
}

function Option() {
  return <div className="absolute left-[-192px] size-0 top-[-937.66px]" data-name="Option" />;
}

function Option1() {
  return <div className="absolute left-[-192px] size-0 top-[-937.66px]" data-name="Option" />;
}

function Dropdown() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[24px] left-[6px] top-[72px] w-[174px]" data-name="Dropdown">
      <Option />
      <Option1 />
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[145px] left-0 top-0 w-[188px]" data-name="Container">
      <Container88 />
      <Container89 />
      <Container90 />
      <Dropdown />
    </div>
  );
}

function Container92() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[6px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">15. OTHER DATE</p>
    </div>
  );
}

function TextInput40() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput41() {
  return (
    <div className="absolute h-[22px] left-[59.33px] top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput42() {
  return (
    <div className="absolute h-[22px] left-[118.66px] top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container93() {
  return (
    <div className="absolute h-[22px] left-[6px] top-[22px] w-[174px]" data-name="Container">
      <TextInput40 />
      <TextInput41 />
      <TextInput42 />
    </div>
  );
}

function Container94() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[48px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">QUAL:</p>
    </div>
  );
}

function Option2() {
  return <div className="absolute left-[-388px] size-0 top-[-925.66px]" data-name="Option" />;
}

function Dropdown1() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[24px] left-[6px] top-[60px] w-[174px]" data-name="Dropdown">
      <Option2 />
    </div>
  );
}

function Container91() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[145px] left-[196px] top-0 w-[188px]" data-name="Container">
      <Container92 />
      <Container93 />
      <Container94 />
      <Dropdown1 />
    </div>
  );
}

function Container96() {
  return (
    <div className="absolute h-[24px] left-[6px] top-[6px] w-[174px]" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[168px]">16. DATES PATIENT UNABLE TO WORK IN CURRENT OCCUPATION</p>
    </div>
  );
}

function Container97() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[34px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">FROM:</p>
    </div>
  );
}

function TextInput43() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput44() {
  return (
    <div className="absolute h-[22px] left-[59.33px] top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput45() {
  return (
    <div className="absolute h-[22px] left-[118.66px] top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container98() {
  return (
    <div className="absolute h-[22px] left-[6px] top-[48px] w-[174px]" data-name="Container">
      <TextInput43 />
      <TextInput44 />
      <TextInput45 />
    </div>
  );
}

function Container99() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[74px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">TO:</p>
    </div>
  );
}

function TextInput46() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput47() {
  return (
    <div className="absolute h-[22px] left-[59.33px] top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput48() {
  return (
    <div className="absolute h-[22px] left-[118.66px] top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container100() {
  return (
    <div className="absolute h-[22px] left-[6px] top-[88px] w-[174px]" data-name="Container">
      <TextInput46 />
      <TextInput47 />
      <TextInput48 />
    </div>
  );
}

function Container95() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[145px] left-[392px] top-0 w-[188px]" data-name="Container">
      <Container96 />
      <Container97 />
      <Container98 />
      <Container99 />
      <Container100 />
    </div>
  );
}

function Container102() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[162px]">17. NAME OF REFERRING PROVIDER OR OTHER SOURCE</p>
    </div>
  );
}

function TextInput49() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">17a.</p>
    </div>
  );
}

function TextInput50() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">17b. NPI</p>
    </div>
  );
}

function TextInput51() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container101() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[145px] items-start left-[588px] pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container102 />
      <TextInput49 />
      <Container103 />
      <TextInput50 />
      <Container104 />
      <TextInput51 />
    </div>
  );
}

function Container106() {
  return (
    <div className="absolute h-[24px] left-[6px] top-[6px] w-[174px]" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[171px]">18. HOSPITALIZATION DATES RELATED TO CURRENT SERVICES</p>
    </div>
  );
}

function Container107() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[34px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">FROM:</p>
    </div>
  );
}

function TextInput52() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput53() {
  return (
    <div className="absolute h-[22px] left-[59.33px] top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput54() {
  return (
    <div className="absolute h-[22px] left-[118.66px] top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container108() {
  return (
    <div className="absolute h-[22px] left-[6px] top-[48px] w-[174px]" data-name="Container">
      <TextInput52 />
      <TextInput53 />
      <TextInput54 />
    </div>
  );
}

function Container109() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[74px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">TO:</p>
    </div>
  );
}

function TextInput55() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput56() {
  return (
    <div className="absolute h-[22px] left-[59.33px] top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput57() {
  return (
    <div className="absolute h-[22px] left-[118.66px] top-0 w-[55.328px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container110() {
  return (
    <div className="absolute h-[22px] left-[6px] top-[88px] w-[174px]" data-name="Container">
      <TextInput55 />
      <TextInput56 />
      <TextInput57 />
    </div>
  );
}

function Container105() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[145px] left-[784px] top-0 w-[188px]" data-name="Container">
      <Container106 />
      <Container107 />
      <Container108 />
      <Container109 />
      <Container110 />
    </div>
  );
}

function Container112() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[161px]">19. ADDITIONAL CLAIM INFORMATION (Designated by NUCC)</p>
    </div>
  );
}

function TextArea() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="Text Area">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container111() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[145px] items-start left-[980px] pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container112 />
      <TextArea />
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[145px] relative shrink-0 w-full" data-name="Container">
      <Container87 />
      <Container91 />
      <Container95 />
      <Container101 />
      <Container105 />
      <Container111 />
    </div>
  );
}

function Container115() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[6px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">20. OUTSIDE LAB?</p>
    </div>
  );
}

function RadioButton16() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label19() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40.234px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton16 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` YES`}</p>
      </div>
    </div>
  );
}

function RadioButton17() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="Radio Button" />;
}

function Label20() {
  return (
    <div className="h-[24px] relative shrink-0 w-[38.375px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RadioButton17 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` NO`}</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-start left-[6px] top-[22px] w-[272px]" data-name="Container">
      <Label19 />
      <Label20 />
    </div>
  );
}

function Container117() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[50px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">$ CHARGES</p>
    </div>
  );
}

function TextInput58() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[6px] top-[64px] w-[272px]" data-name="Text Input" />;
}

function Container114() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[122px] left-0 top-0 w-[286px]" data-name="Container">
      <Container115 />
      <Container116 />
      <Container117 />
      <TextInput58 />
    </div>
  );
}

function Container119() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[264px]">21. DIAGNOSIS OR NATURE OF ILLNESS OR INJURY Relate A-L to service line below (24E)</p>
    </div>
  );
}

function Container122() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">A.</p>
    </div>
  );
}

function TextInput59() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">ICD Ind.</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container121() {
  return (
    <div className="absolute content-stretch flex flex-col h-[38px] items-start left-0 top-0 w-[134px]" data-name="Container">
      <Container122 />
      <TextInput59 />
    </div>
  );
}

function Container124() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">B.</p>
    </div>
  );
}

function TextInput60() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container123() {
  return (
    <div className="absolute content-stretch flex flex-col h-[38px] items-start left-[138px] top-0 w-[134px]" data-name="Container">
      <Container124 />
      <TextInput60 />
    </div>
  );
}

function Container126() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">C.</p>
    </div>
  );
}

function TextInput61() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container125() {
  return (
    <div className="absolute content-stretch flex flex-col h-[38px] items-start left-0 top-[42px] w-[134px]" data-name="Container">
      <Container126 />
      <TextInput61 />
    </div>
  );
}

function Container128() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">D.</p>
    </div>
  );
}

function TextInput62() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container127() {
  return (
    <div className="absolute content-stretch flex flex-col h-[38px] items-start left-[138px] top-[42px] w-[134px]" data-name="Container">
      <Container128 />
      <TextInput62 />
    </div>
  );
}

function Container120() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="Container">
      <Container121 />
      <Container123 />
      <Container125 />
      <Container127 />
    </div>
  );
}

function Container118() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[122px] items-start left-[294px] pb-px pt-[7px] px-[7px] top-0 w-[286px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container119 />
      <Container120 />
    </div>
  );
}

function Container130() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">22. RESUBMISSION CODE</p>
    </div>
  );
}

function TextInput63() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container131() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">ORIGINAL REF. NO.</p>
    </div>
  );
}

function TextInput64() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container129() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[122px] items-start left-[588px] pb-px pt-[7px] px-[7px] top-0 w-[286px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container130 />
      <TextInput63 />
      <Container131 />
      <TextInput64 />
    </div>
  );
}

function Container133() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">23. PRIOR AUTHORIZATION NUMBER</p>
    </div>
  );
}

function TextInput65() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container132() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[122px] items-start left-[882px] pb-px pt-[7px] px-[7px] top-0 w-[286px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container133 />
      <TextInput65 />
    </div>
  );
}

function Container113() {
  return (
    <div className="h-[122px] relative shrink-0 w-full" data-name="Container">
      <Container114 />
      <Container118 />
      <Container129 />
      <Container132 />
    </div>
  );
}

function Container137() {
  return (
    <div className="h-[21.313px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] w-[64px]">24. A. DATE(S) OF SERVICE</p>
    </div>
  );
}

function Container139() {
  return (
    <div className="absolute border-[#d1d5dc] border-r border-solid h-[10.656px] left-0 top-0 w-[44.078px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-[21.41px] not-italic text-[#0a0a0a] text-[8px] text-center top-[-1px] whitespace-nowrap">From</p>
    </div>
  );
}

function Container140() {
  return (
    <div className="absolute h-[10.656px] left-[44.08px] top-0 w-[44.078px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-[21.98px] not-italic text-[#0a0a0a] text-[8px] text-center top-[-1px] whitespace-nowrap">To</p>
    </div>
  );
}

function Container138() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <Container139 />
      <Container140 />
    </div>
  );
}

function Container136() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container137 />
      <Container138 />
    </div>
  );
}

function Container142() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">B. PLACE OF SERVICE</p>
    </div>
  );
}

function Container141() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container142 />
    </div>
  );
}

function Container144() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">C. EMG</p>
    </div>
  );
}

function Container143() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container144 />
    </div>
  );
}

function Container146() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">D. PROCEDURES, SERVICES, OR SUPPLIES</p>
    </div>
  );
}

function Container147() {
  return (
    <div className="h-[9.328px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[9.333px] left-0 not-italic text-[#0a0a0a] text-[7px] top-[-1px] whitespace-nowrap">(Explain Unusual Circumstances)</p>
    </div>
  );
}

function Container149() {
  return (
    <div className="absolute h-[10.656px] left-0 top-0 w-[92.672px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">CPT/HCPCS</p>
    </div>
  );
}

function Container150() {
  return (
    <div className="absolute h-[10.656px] left-[92.67px] top-0 w-[92.672px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">MODIFIER</p>
    </div>
  );
}

function Container148() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <Container149 />
      <Container150 />
    </div>
  );
}

function Container145() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container146 />
      <Container147 />
      <Container148 />
    </div>
  );
}

function Container152() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">E. DIAGNOSIS POINTER</p>
    </div>
  );
}

function Container151() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container152 />
    </div>
  );
}

function Container154() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">F. $ CHARGES</p>
    </div>
  );
}

function Container153() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container154 />
    </div>
  );
}

function Container156() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">G. DAYS OR UNITS</p>
    </div>
  );
}

function Container155() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container156 />
    </div>
  );
}

function Container158() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">H. EPSDT Family Plan</p>
    </div>
  );
}

function Container157() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container158 />
    </div>
  );
}

function Container160() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">I. ID QUAL</p>
    </div>
  );
}

function Container159() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container160 />
    </div>
  );
}

function Container161() {
  return (
    <div className="absolute h-[10.656px] left-[975.66px] top-[4px] w-[186.328px]" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">J. RENDERING PROVIDER ID. #</p>
    </div>
  );
}

function Container135() {
  return (
    <div className="bg-[#f9fafb] h-[40.969px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container136 />
      <Container141 />
      <Container143 />
      <Container145 />
      <Container151 />
      <Container153 />
      <Container155 />
      <Container157 />
      <Container159 />
      <Container161 />
    </div>
  );
}

function TextInput66() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[43.078px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput67() {
  return (
    <div className="absolute h-[21px] left-[45.08px] top-0 w-[43.078px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container164() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <TextInput66 />
      <TextInput67 />
    </div>
  );
}

function Container163() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container164 />
    </div>
  );
}

function TextInput68() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container165() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput68 />
    </div>
  );
}

function TextInput69() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container166() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput69 />
    </div>
  );
}

function TextInput70() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">CPT/HCPCS</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput71() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Description</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container167() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[54px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput70 />
      <TextInput71 />
    </div>
  );
}

function TextInput72() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container168() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput72 />
    </div>
  );
}

function TextInput73() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container169() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput73 />
    </div>
  );
}

function TextInput74() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container170() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput74 />
    </div>
  );
}

function Checkbox3() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text2() {
  return (
    <div className="h-[12px] relative shrink-0 w-[3.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Label21() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-0 w-[43.078px]" data-name="Label">
      <Checkbox3 />
      <Text2 />
    </div>
  );
}

function Checkbox4() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text3() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Label22() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-0 w-[43.078px]" data-name="Label">
      <Checkbox4 />
      <Text3 />
    </div>
  );
}

function Checkbox5() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text4() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Label23() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[14px] w-[43.078px]" data-name="Label">
      <Checkbox5 />
      <Text4 />
    </div>
  );
}

function Checkbox6() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text5() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Label24() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[14px] w-[43.078px]" data-name="Label">
      <Checkbox6 />
      <Text5 />
    </div>
  );
}

function Checkbox7() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text6() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Label25() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[28px] w-[43.078px]" data-name="Label">
      <Checkbox7 />
      <Text6 />
    </div>
  );
}

function Checkbox8() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text7() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">6</p>
      </div>
    </div>
  );
}

function Label26() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[28px] w-[43.078px]" data-name="Label">
      <Checkbox8 />
      <Text7 />
    </div>
  );
}

function Container172() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <Label21 />
      <Label22 />
      <Label23 />
      <Label24 />
      <Label25 />
      <Label26 />
    </div>
  );
}

function Container171() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container172 />
    </div>
  );
}

function TextInput75() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container173() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput75 />
    </div>
  );
}

function TextInput76() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[975.66px] top-[4px] w-[186.328px]" data-name="Text Input" />;
}

function Container162() {
  return (
    <div className="h-[55px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container163 />
      <Container165 />
      <Container166 />
      <Container167 />
      <Container168 />
      <Container169 />
      <Container170 />
      <Container171 />
      <Container173 />
      <TextInput76 />
    </div>
  );
}

function TextInput77() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[43.078px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput78() {
  return (
    <div className="absolute h-[21px] left-[45.08px] top-0 w-[43.078px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container176() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <TextInput77 />
      <TextInput78 />
    </div>
  );
}

function Container175() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container176 />
    </div>
  );
}

function TextInput79() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container177() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput79 />
    </div>
  );
}

function TextInput80() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container178() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput80 />
    </div>
  );
}

function TextInput81() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">CPT/HCPCS</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput82() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Description</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container179() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[54px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput81 />
      <TextInput82 />
    </div>
  );
}

function TextInput83() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container180() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput83 />
    </div>
  );
}

function TextInput84() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container181() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput84 />
    </div>
  );
}

function TextInput85() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container182() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput85 />
    </div>
  );
}

function Checkbox9() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text8() {
  return (
    <div className="h-[12px] relative shrink-0 w-[3.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Label27() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-0 w-[43.078px]" data-name="Label">
      <Checkbox9 />
      <Text8 />
    </div>
  );
}

function Checkbox10() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text9() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Label28() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-0 w-[43.078px]" data-name="Label">
      <Checkbox10 />
      <Text9 />
    </div>
  );
}

function Checkbox11() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text10() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Label29() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[14px] w-[43.078px]" data-name="Label">
      <Checkbox11 />
      <Text10 />
    </div>
  );
}

function Checkbox12() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text11() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Label30() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[14px] w-[43.078px]" data-name="Label">
      <Checkbox12 />
      <Text11 />
    </div>
  );
}

function Checkbox13() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text12() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Label31() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[28px] w-[43.078px]" data-name="Label">
      <Checkbox13 />
      <Text12 />
    </div>
  );
}

function Checkbox14() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text13() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">6</p>
      </div>
    </div>
  );
}

function Label32() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[28px] w-[43.078px]" data-name="Label">
      <Checkbox14 />
      <Text13 />
    </div>
  );
}

function Container184() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <Label27 />
      <Label28 />
      <Label29 />
      <Label30 />
      <Label31 />
      <Label32 />
    </div>
  );
}

function Container183() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container184 />
    </div>
  );
}

function TextInput86() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container185() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput86 />
    </div>
  );
}

function TextInput87() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[975.66px] top-[4px] w-[186.328px]" data-name="Text Input" />;
}

function Container174() {
  return (
    <div className="h-[55px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container175 />
      <Container177 />
      <Container178 />
      <Container179 />
      <Container180 />
      <Container181 />
      <Container182 />
      <Container183 />
      <Container185 />
      <TextInput87 />
    </div>
  );
}

function TextInput88() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[43.078px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput89() {
  return (
    <div className="absolute h-[21px] left-[45.08px] top-0 w-[43.078px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container188() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <TextInput88 />
      <TextInput89 />
    </div>
  );
}

function Container187() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container188 />
    </div>
  );
}

function TextInput90() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container189() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput90 />
    </div>
  );
}

function TextInput91() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container190() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput91 />
    </div>
  );
}

function TextInput92() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">CPT/HCPCS</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput93() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Description</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container191() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[54px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput92 />
      <TextInput93 />
    </div>
  );
}

function TextInput94() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container192() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput94 />
    </div>
  );
}

function TextInput95() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container193() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput95 />
    </div>
  );
}

function TextInput96() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container194() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput96 />
    </div>
  );
}

function Checkbox15() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text14() {
  return (
    <div className="h-[12px] relative shrink-0 w-[3.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Label33() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-0 w-[43.078px]" data-name="Label">
      <Checkbox15 />
      <Text14 />
    </div>
  );
}

function Checkbox16() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text15() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Label34() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-0 w-[43.078px]" data-name="Label">
      <Checkbox16 />
      <Text15 />
    </div>
  );
}

function Checkbox17() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text16() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Label35() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[14px] w-[43.078px]" data-name="Label">
      <Checkbox17 />
      <Text16 />
    </div>
  );
}

function Checkbox18() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text17() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Label36() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[14px] w-[43.078px]" data-name="Label">
      <Checkbox18 />
      <Text17 />
    </div>
  );
}

function Checkbox19() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text18() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Label37() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[28px] w-[43.078px]" data-name="Label">
      <Checkbox19 />
      <Text18 />
    </div>
  );
}

function Checkbox20() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text19() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">6</p>
      </div>
    </div>
  );
}

function Label38() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[28px] w-[43.078px]" data-name="Label">
      <Checkbox20 />
      <Text19 />
    </div>
  );
}

function Container196() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <Label33 />
      <Label34 />
      <Label35 />
      <Label36 />
      <Label37 />
      <Label38 />
    </div>
  );
}

function Container195() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container196 />
    </div>
  );
}

function TextInput97() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container197() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput97 />
    </div>
  );
}

function TextInput98() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[975.66px] top-[4px] w-[186.328px]" data-name="Text Input" />;
}

function Container186() {
  return (
    <div className="h-[55px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container187 />
      <Container189 />
      <Container190 />
      <Container191 />
      <Container192 />
      <Container193 />
      <Container194 />
      <Container195 />
      <Container197 />
      <TextInput98 />
    </div>
  );
}

function TextInput99() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[43.078px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput100() {
  return (
    <div className="absolute h-[21px] left-[45.08px] top-0 w-[43.078px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container200() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <TextInput99 />
      <TextInput100 />
    </div>
  );
}

function Container199() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container200 />
    </div>
  );
}

function TextInput101() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container201() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput101 />
    </div>
  );
}

function TextInput102() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container202() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput102 />
    </div>
  );
}

function TextInput103() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">CPT/HCPCS</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput104() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Description</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container203() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[54px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput103 />
      <TextInput104 />
    </div>
  );
}

function TextInput105() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container204() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput105 />
    </div>
  );
}

function TextInput106() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container205() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput106 />
    </div>
  );
}

function TextInput107() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container206() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput107 />
    </div>
  );
}

function Checkbox21() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text20() {
  return (
    <div className="h-[12px] relative shrink-0 w-[3.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Label39() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-0 w-[43.078px]" data-name="Label">
      <Checkbox21 />
      <Text20 />
    </div>
  );
}

function Checkbox22() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text21() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Label40() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-0 w-[43.078px]" data-name="Label">
      <Checkbox22 />
      <Text21 />
    </div>
  );
}

function Checkbox23() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text22() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Label41() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[14px] w-[43.078px]" data-name="Label">
      <Checkbox23 />
      <Text22 />
    </div>
  );
}

function Checkbox24() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text23() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Label42() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[14px] w-[43.078px]" data-name="Label">
      <Checkbox24 />
      <Text23 />
    </div>
  );
}

function Checkbox25() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text24() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Label43() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[28px] w-[43.078px]" data-name="Label">
      <Checkbox25 />
      <Text24 />
    </div>
  );
}

function Checkbox26() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text25() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">6</p>
      </div>
    </div>
  );
}

function Label44() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[28px] w-[43.078px]" data-name="Label">
      <Checkbox26 />
      <Text25 />
    </div>
  );
}

function Container208() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <Label39 />
      <Label40 />
      <Label41 />
      <Label42 />
      <Label43 />
      <Label44 />
    </div>
  );
}

function Container207() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container208 />
    </div>
  );
}

function TextInput108() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container209() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput108 />
    </div>
  );
}

function TextInput109() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[975.66px] top-[4px] w-[186.328px]" data-name="Text Input" />;
}

function Container198() {
  return (
    <div className="h-[55px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container199 />
      <Container201 />
      <Container202 />
      <Container203 />
      <Container204 />
      <Container205 />
      <Container206 />
      <Container207 />
      <Container209 />
      <TextInput109 />
    </div>
  );
}

function TextInput110() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[43.078px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput111() {
  return (
    <div className="absolute h-[21px] left-[45.08px] top-0 w-[43.078px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container212() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <TextInput110 />
      <TextInput111 />
    </div>
  );
}

function Container211() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container212 />
    </div>
  );
}

function TextInput112() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container213() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput112 />
    </div>
  );
}

function TextInput113() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container214() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput113 />
    </div>
  );
}

function TextInput114() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">CPT/HCPCS</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput115() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Description</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container215() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[54px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput114 />
      <TextInput115 />
    </div>
  );
}

function TextInput116() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container216() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput116 />
    </div>
  );
}

function TextInput117() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container217() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput117 />
    </div>
  );
}

function TextInput118() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container218() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput118 />
    </div>
  );
}

function Checkbox27() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text26() {
  return (
    <div className="h-[12px] relative shrink-0 w-[3.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Label45() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-0 w-[43.078px]" data-name="Label">
      <Checkbox27 />
      <Text26 />
    </div>
  );
}

function Checkbox28() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text27() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Label46() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-0 w-[43.078px]" data-name="Label">
      <Checkbox28 />
      <Text27 />
    </div>
  );
}

function Checkbox29() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text28() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Label47() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[14px] w-[43.078px]" data-name="Label">
      <Checkbox29 />
      <Text28 />
    </div>
  );
}

function Checkbox30() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text29() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Label48() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[14px] w-[43.078px]" data-name="Label">
      <Checkbox30 />
      <Text29 />
    </div>
  );
}

function Checkbox31() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text30() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Label49() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[28px] w-[43.078px]" data-name="Label">
      <Checkbox31 />
      <Text30 />
    </div>
  );
}

function Checkbox32() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text31() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">6</p>
      </div>
    </div>
  );
}

function Label50() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[28px] w-[43.078px]" data-name="Label">
      <Checkbox32 />
      <Text31 />
    </div>
  );
}

function Container220() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <Label45 />
      <Label46 />
      <Label47 />
      <Label48 />
      <Label49 />
      <Label50 />
    </div>
  );
}

function Container219() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container220 />
    </div>
  );
}

function TextInput119() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container221() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput119 />
    </div>
  );
}

function TextInput120() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[975.66px] top-[4px] w-[186.328px]" data-name="Text Input" />;
}

function Container210() {
  return (
    <div className="h-[55px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container211 />
      <Container213 />
      <Container214 />
      <Container215 />
      <Container216 />
      <Container217 />
      <Container218 />
      <Container219 />
      <Container221 />
      <TextInput120 />
    </div>
  );
}

function TextInput121() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[43.078px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput122() {
  return (
    <div className="absolute h-[21px] left-[45.08px] top-0 w-[43.078px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container224() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <TextInput121 />
      <TextInput122 />
    </div>
  );
}

function Container223() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container224 />
    </div>
  );
}

function TextInput123() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container225() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput123 />
    </div>
  );
}

function TextInput124() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container226() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput124 />
    </div>
  );
}

function TextInput125() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">CPT/HCPCS</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput126() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Description</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container227() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[54px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput125 />
      <TextInput126 />
    </div>
  );
}

function TextInput127() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container228() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput127 />
    </div>
  );
}

function TextInput128() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container229() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput128 />
    </div>
  );
}

function TextInput129() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container230() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput129 />
    </div>
  );
}

function Checkbox33() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text32() {
  return (
    <div className="h-[12px] relative shrink-0 w-[3.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Label51() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-0 w-[43.078px]" data-name="Label">
      <Checkbox33 />
      <Text32 />
    </div>
  );
}

function Checkbox34() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text33() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Label52() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-0 w-[43.078px]" data-name="Label">
      <Checkbox34 />
      <Text33 />
    </div>
  );
}

function Checkbox35() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text34() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Label53() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[14px] w-[43.078px]" data-name="Label">
      <Checkbox35 />
      <Text34 />
    </div>
  );
}

function Checkbox36() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text35() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Label54() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[14px] w-[43.078px]" data-name="Label">
      <Checkbox36 />
      <Text35 />
    </div>
  );
}

function Checkbox37() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text36() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Label55() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[28px] w-[43.078px]" data-name="Label">
      <Checkbox37 />
      <Text36 />
    </div>
  );
}

function Checkbox38() {
  return <div className="shrink-0 size-[10px]" data-name="Checkbox" />;
}

function Text37() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">6</p>
      </div>
    </div>
  );
}

function Label56() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[28px] w-[43.078px]" data-name="Label">
      <Checkbox38 />
      <Text37 />
    </div>
  );
}

function Container232() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <Label51 />
      <Label52 />
      <Label53 />
      <Label54 />
      <Label55 />
      <Label56 />
    </div>
  );
}

function Container231() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container232 />
    </div>
  );
}

function TextInput130() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container233() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <TextInput130 />
    </div>
  );
}

function TextInput131() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[975.66px] top-[4px] w-[186.328px]" data-name="Text Input" />;
}

function Container222() {
  return (
    <div className="h-[55px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container223 />
      <Container225 />
      <Container226 />
      <Container227 />
      <Container228 />
      <Container229 />
      <Container230 />
      <Container231 />
      <Container233 />
      <TextInput131 />
    </div>
  );
}

function Container134() {
  return (
    <div className="h-[372.969px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start p-px relative size-full">
        <Container135 />
        <Container162 />
        <Container174 />
        <Container186 />
        <Container198 />
        <Container210 />
        <Container222 />
      </div>
    </div>
  );
}

function Container236() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">25. FEDERAL TAX I.D. NUMBER</p>
    </div>
  );
}

function TextInput132() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Checkbox39() {
  return <div className="shrink-0 size-[12px]" data-name="Checkbox" />;
}

function Text38() {
  return (
    <div className="flex-[1_0_0] h-[13.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.5px] not-italic relative shrink-0 text-[#0a0a0a] text-[9px] whitespace-nowrap">SSN</p>
      </div>
    </div>
  );
}

function Label57() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[30.719px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center relative size-full">
        <Checkbox39 />
        <Text38 />
      </div>
    </div>
  );
}

function Checkbox40() {
  return <div className="shrink-0 size-[12px]" data-name="Checkbox" />;
}

function Text39() {
  return (
    <div className="flex-[1_0_0] h-[13.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.5px] not-italic relative shrink-0 text-[#0a0a0a] text-[9px] whitespace-nowrap">EIN</p>
      </div>
    </div>
  );
}

function Label58() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[28.188px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center relative size-full">
        <Checkbox40 />
        <Text39 />
      </div>
    </div>
  );
}

function Container237() {
  return (
    <div className="content-stretch flex gap-[8px] h-[13.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Label57 />
      <Label58 />
    </div>
  );
}

function Container235() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[69.5px] items-start left-0 pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container236 />
      <TextInput132 />
      <Container237 />
    </div>
  );
}

function Container239() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`26. PATIENT'S ACCOUNT NO.`}</p>
    </div>
  );
}

function TextInput133() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container238() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[69.5px] items-start left-[196px] pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container239 />
      <TextInput133 />
    </div>
  );
}

function Container241() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">27. ACCEPT ASSIGNMENT?</p>
    </div>
  );
}

function Container242() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">(For govt. claims, see back)</p>
    </div>
  );
}

function RadioButton18() {
  return <div className="shrink-0 size-[12px]" data-name="Radio Button" />;
}

function Text40() {
  return (
    <div className="flex-[1_0_0] h-[13.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.5px] not-italic relative shrink-0 text-[#0a0a0a] text-[9px] whitespace-nowrap">YES</p>
      </div>
    </div>
  );
}

function Label59() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[28.766px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center relative size-full">
        <RadioButton18 />
        <Text40 />
      </div>
    </div>
  );
}

function RadioButton19() {
  return <div className="shrink-0 size-[12px]" data-name="Radio Button" />;
}

function Text41() {
  return (
    <div className="flex-[1_0_0] h-[13.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.5px] not-italic relative shrink-0 text-[#0a0a0a] text-[9px] whitespace-nowrap">NO</p>
      </div>
    </div>
  );
}

function Label60() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[27.719px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center relative size-full">
        <RadioButton19 />
        <Text41 />
      </div>
    </div>
  );
}

function Container243() {
  return (
    <div className="content-stretch flex gap-[8px] h-[13.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Label59 />
      <Label60 />
    </div>
  );
}

function Container240() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[69.5px] items-start left-[392px] pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container241 />
      <Container242 />
      <Container243 />
    </div>
  );
}

function Container245() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">28. TOTAL CHARGE</p>
    </div>
  );
}

function TextInput134() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] whitespace-nowrap">$</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container244() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[69.5px] items-start left-[588px] pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container245 />
      <TextInput134 />
    </div>
  );
}

function Container247() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">29. AMOUNT PAID</p>
    </div>
  );
}

function TextInput135() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] whitespace-nowrap">$</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container246() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[69.5px] items-start left-[784px] pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container247 />
      <TextInput135 />
    </div>
  );
}

function Container249() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">30. RSVD FOR NUCC USE</p>
    </div>
  );
}

function Container248() {
  return (
    <div className="absolute content-stretch flex flex-col h-[69.5px] items-start left-[980px] pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container249 />
    </div>
  );
}

function Container234() {
  return (
    <div className="h-[69.5px] relative shrink-0 w-full" data-name="Container">
      <Container235 />
      <Container238 />
      <Container240 />
      <Container244 />
      <Container246 />
      <Container248 />
    </div>
  );
}

function Container252() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[6px] w-[370px]" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[9px] whitespace-nowrap">31. SIGNATURE OF PHYSICIAN OR SUPPLIER INCLUDING DEGREES OR CREDENTIALS</p>
    </div>
  );
}

function Container253() {
  return (
    <div className="absolute h-[10.656px] left-[6px] top-[22px] w-[370px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">(I certify that the statements on the reverse apply to this bill and are made a part thereof.)</p>
    </div>
  );
}

function Container255() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-0 top-[4px] w-[370px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">SIGNED</p>
    </div>
  );
}

function TextInput136() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-0 top-[16px] w-[370px]" data-name="Text Input" />;
}

function Container256() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-0 top-[41px] w-[370px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">DATE</p>
    </div>
  );
}

function TextInput137() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-0 top-[53px] w-[370px]" data-name="Text Input" />;
}

function Container254() {
  return (
    <div className="absolute border-[#d1d5dc] border-solid border-t h-[75px] left-[6px] top-[40.66px] w-[370px]" data-name="Container">
      <Container255 />
      <TextInput136 />
      <Container256 />
      <TextInput137 />
    </div>
  );
}

function Container251() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[210px] left-0 top-0 w-[384px]" data-name="Container">
      <Container252 />
      <Container253 />
      <Container254 />
    </div>
  );
}

function Container258() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">32. SERVICE FACILITY LOCATION INFORMATION</p>
    </div>
  );
}

function TextInput138() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Name</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput139() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Address line 1</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput140() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">City, State, ZIP</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container259() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">32a. NPI</p>
    </div>
  );
}

function TextInput141() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container260() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">32b. Other ID</p>
    </div>
  );
}

function TextInput142() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container257() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[210px] items-start left-[392px] pb-px pt-[7px] px-[7px] top-0 w-[384px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container258 />
      <TextInput138 />
      <TextInput139 />
      <TextInput140 />
      <Container259 />
      <TextInput141 />
      <Container260 />
      <TextInput142 />
    </div>
  );
}

function Container262() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`33. BILLING PROVIDER INFO & PH #`}</p>
    </div>
  );
}

function TextInput143() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Name</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput144() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Address line 1</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput145() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">City, State, ZIP</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextInput146() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Phone #</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container263() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">33a. NPI</p>
    </div>
  );
}

function TextInput147() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container264() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">33b. Other ID</p>
    </div>
  );
}

function TextInput148() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container261() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[210px] items-start left-[784px] pb-px pt-[7px] px-[7px] top-0 w-[384px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container262 />
      <TextInput143 />
      <TextInput144 />
      <TextInput145 />
      <TextInput146 />
      <Container263 />
      <TextInput147 />
      <Container264 />
      <TextInput148 />
    </div>
  );
}

function Container250() {
  return (
    <div className="h-[210px] relative shrink-0 w-full" data-name="Container">
      <Container251 />
      <Container257 />
      <Container261 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[10.667px] left-0 not-italic text-[#4a5565] text-[8px] top-[-1px] whitespace-nowrap">Please Print or Type</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#4a5565] text-[8px] top-[-1px] whitespace-nowrap">NUCC Instruction Manual available at: www.nucc.org</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#4a5565] text-[8px] top-[-1px] whitespace-nowrap">OMB APPROVAL PENDING</p>
    </div>
  );
}

function Container265() {
  return (
    <div className="bg-[#f9fafb] h-[57.969px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[9px] px-[9px] relative size-full">
        <Paragraph />
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[1676.094px] items-start relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container31 />
      <Container45 />
      <Container86 />
      <Container113 />
      <Container134 />
      <Container234 />
      <Container250 />
      <Container265 />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[46px] relative rounded-[10px] shrink-0 w-[224.719px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[112px] not-italic text-[#364153] text-[16px] text-center top-[9px] whitespace-nowrap">Back to Session Selection</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] h-[46px] min-h-px min-w-px relative rounded-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[75px] not-italic text-[#364153] text-[16px] text-center top-[9px] whitespace-nowrap">Download PDF</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#3b82f6] h-[44px] relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-[145.047px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[73px] not-italic text-[16px] text-center text-white top-[8px] whitespace-nowrap">Submit Claim</p>
      </div>
    </div>
  );
}

function Container267() {
  return (
    <div className="h-[46px] relative shrink-0 w-[306.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Container266() {
  return (
    <div className="content-stretch flex h-[71px] items-center justify-between pt-px relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <Button1 />
      <Container267 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white h-[1843.094px] relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[32px] items-start pt-[32px] px-[32px] relative size-full">
        <Container8 />
        <Container266 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[1959.094px] items-start left-[152px] top-[97px] w-[1232px]" data-name="Container">
      <Container4 />
      <Container7 />
    </div>
  );
}

export default function ExpertViewClientProfileUi() {
  return (
    <div className="bg-[#f5f5f7] relative size-full" data-name="Expert View Client Profile UI">
      <Container />
      <Container3 />
    </div>
  );
}